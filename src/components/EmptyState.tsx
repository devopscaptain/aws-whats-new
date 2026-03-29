import { motion } from 'framer-motion'
import { SearchX, FilterX } from 'lucide-react'

interface EmptyStateProps {
  hasFilters: boolean
  onClear: () => void
}

export function EmptyState({ hasFilters, onClear }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-surface-2 border border-border flex items-center justify-center mb-4">
        {hasFilters ? (
          <FilterX className="w-7 h-7 text-muted" />
        ) : (
          <SearchX className="w-7 h-7 text-muted" />
        )}
      </div>
      <h3 className="text-sm font-semibold text-heading mb-1">No announcements found</h3>
      <p className="text-xs text-muted max-w-xs mb-4">
        {hasFilters
          ? 'Try removing some filters to see more results.'
          : 'Try a different search term.'}
      </p>
      {hasFilters && (
        <button
          onClick={onClear}
          className="text-xs text-accent hover:text-accent-bright transition-colors underline underline-offset-2"
        >
          Clear all filters
        </button>
      )}
    </motion.div>
  )
}
