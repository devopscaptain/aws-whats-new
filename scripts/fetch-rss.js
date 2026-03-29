#!/usr/bin/env node
import https from 'https'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { parseRSS } from './parse-rss.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'data', 'whats-new.json')
const RSS_URL = 'https://aws.amazon.com/about-aws/whats-new/recent/feed/'
const MAX_ITEMS = 500
const MAX_RETRIES = 3

function fetchURL(url, retries = MAX_RETRIES) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { timeout: 15000 }, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchURL(res.headers.location, retries).then(resolve).catch(reject)
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`))
      }
      const chunks = []
      res.on('data', (chunk) => chunks.push(chunk))
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')))
      res.on('error', reject)
    })
    req.on('timeout', () => {
      req.destroy()
      reject(new Error('Request timed out'))
    })
    req.on('error', reject)
  }).catch((err) => {
    if (retries > 0) {
      const delay = (MAX_RETRIES - retries + 1) * 2000
      console.warn(`  Retry in ${delay}ms (${retries} left): ${err.message}`)
      return new Promise((r) => setTimeout(r, delay)).then(() => fetchURL(url, retries - 1))
    }
    throw err
  })
}

async function main() {
  console.log('→ Fetching AWS What\'s New RSS feed...')

  const xml = await fetchURL(RSS_URL)
  const newItems = parseRSS(xml)
  console.log(`  Parsed ${newItems.length} items from feed`)

  // Read existing data and merge
  let existingItems = []
  if (fs.existsSync(OUTPUT_PATH)) {
    try {
      const existing = JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf-8'))
      existingItems = existing.items ?? []
    } catch {
      console.warn('  Could not read existing data, starting fresh')
    }
  }

  // Deduplicate by id, new items win on conflict
  const byId = new Map(existingItems.map((i) => [i.id, i]))
  for (const item of newItems) {
    byId.set(item.id, item)
  }

  const items = [...byId.values()]
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, MAX_ITEMS)

  const feed = {
    lastUpdated: new Date().toISOString(),
    itemCount: items.length,
    items,
  }

  // Atomic write: write to .tmp then rename
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true })
  const tmp = OUTPUT_PATH + '.tmp'
  fs.writeFileSync(tmp, JSON.stringify(feed, null, 2), 'utf-8')
  fs.renameSync(tmp, OUTPUT_PATH)

  console.log(`✓ Wrote ${items.length} items to public/data/whats-new.json`)
  console.log(`  New this week: ${items.filter((i) => i.isNew).length}`)
}

main().catch((err) => {
  console.error('✗ Fetch failed:', err.message)
  process.exit(1)
})
