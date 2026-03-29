// Deterministic color palette — same service always gets the same color
const PALETTE = [
  { bg: 'rgba(99,102,241,0.15)',  text: '#a5b4fc', border: 'rgba(99,102,241,0.3)'  }, // indigo
  { bg: 'rgba(34,211,238,0.12)',  text: '#67e8f9', border: 'rgba(34,211,238,0.3)'  }, // cyan
  { bg: 'rgba(52,211,153,0.12)',  text: '#6ee7b7', border: 'rgba(52,211,153,0.3)'  }, // emerald
  { bg: 'rgba(251,146,60,0.12)',  text: '#fdba74', border: 'rgba(251,146,60,0.3)'  }, // orange
  { bg: 'rgba(244,114,182,0.12)', text: '#f9a8d4', border: 'rgba(244,114,182,0.3)' }, // pink
  { bg: 'rgba(167,139,250,0.12)', text: '#c4b5fd', border: 'rgba(167,139,250,0.3)' }, // violet
  { bg: 'rgba(251,191,36,0.12)',  text: '#fcd34d', border: 'rgba(251,191,36,0.3)'  }, // amber
  { bg: 'rgba(74,222,128,0.12)',  text: '#86efac', border: 'rgba(74,222,128,0.3)'  }, // green
  { bg: 'rgba(248,113,113,0.12)', text: '#fca5a5', border: 'rgba(248,113,113,0.3)' }, // red
  { bg: 'rgba(56,189,248,0.12)',  text: '#7dd3fc', border: 'rgba(56,189,248,0.3)'  }, // sky
  { bg: 'rgba(163,230,53,0.12)',  text: '#bef264', border: 'rgba(163,230,53,0.3)'  }, // lime
  { bg: 'rgba(232,121,249,0.12)', text: '#f0abfc', border: 'rgba(232,121,249,0.3)' }, // fuchsia
]

function djb2(str: string): number {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i)
  }
  return Math.abs(hash)
}

export function tagColor(tag: string) {
  return PALETTE[djb2(tag.toLowerCase()) % PALETTE.length]
}

export function serviceGlow(service: string): string {
  const color = tagColor(service)
  return color.border
}
