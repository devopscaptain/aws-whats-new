import { tagColor } from '../utils/colorUtils'

interface TagBadgeProps {
  tag: string
  onClick?: () => void
  active?: boolean
  size?: 'sm' | 'md'
}

export function TagBadge({ tag, onClick, active = false, size = 'sm' }: TagBadgeProps) {
  const color = tagColor(tag)
  const isClickable = !!onClick

  return (
    <span
      onClick={onClick}
      style={{
        backgroundColor: active ? color.bg : 'rgba(255,255,255,0.04)',
        color: active ? color.text : '#7a8aa8',
        borderColor: active ? color.border : 'rgba(255,255,255,0.08)',
        cursor: isClickable ? 'pointer' : 'default',
      }}
      className={`
        inline-flex items-center border rounded-full font-medium transition-all duration-200
        ${size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'}
        ${isClickable ? 'hover:opacity-90 select-none' : ''}
        ${active ? 'shadow-sm' : ''}
      `}
    >
      {tag}
    </span>
  )
}
