import { AnimatePresence, motion } from 'framer-motion'
import { NewsCard } from './NewsCard'
import { EmptyState } from './EmptyState'
import type { WhatsNewItem } from '../types/news'

interface NewsGridProps {
  items: WhatsNewItem[]
  hasFilters: boolean
  onClearFilters: () => void
}

export function NewsGrid({ items, hasFilters, onClearFilters }: NewsGridProps) {
  if (items.length === 0) {
    return <EmptyState hasFilters={hasFilters} onClear={onClearFilters} />
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
    >
      <AnimatePresence mode="popLayout">
        {items.map((item, i) => (
          <NewsCard key={item.id} item={item} index={i} />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
