import { Github, RefreshCw, Rss, Anchor } from 'lucide-react'
import { SearchBar } from './SearchBar'
import { lastSynced } from '../utils/dateUtils'

interface HeaderProps {
  query: string
  onSearch: (q: string) => void
  resultCount: number
  lastUpdated: string | null
  totalCount: number
  newCount: number
}

export function Header({ query, onSearch, resultCount, lastUpdated, totalCount, newCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-base/85 backdrop-blur-xl">
      {/* Rainbow top border */}
      <div className="h-[2px] w-full bg-gradient-to-r from-violet-500 via-cyan-400 via-emerald-400 to-fuchsia-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main nav row */}
        <div className="flex items-center gap-4 py-4">

          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-violet-600 to-cyan-500 shadow-lg shadow-violet-500/25">
                <Anchor className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-base animate-pulse-slow shadow-sm shadow-emerald-400/50" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-black tracking-tight bg-gradient-to-r from-violet-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                  DevOps
                </span>
                <span className="text-base font-black tracking-tight text-white">
                  Captain
                </span>
              </div>
              <p className="text-[10px] text-muted font-medium tracking-widest uppercase">
                AWS What's New
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 flex justify-center px-4">
            <SearchBar query={query} onChange={onSearch} resultCount={resultCount} />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://aws.amazon.com/about-aws/whats-new/recent/feed/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted hover:text-orange-400 hover:bg-orange-500/10 border border-transparent hover:border-orange-500/20 transition-all duration-200"
              title="RSS Feed"
            >
              <Rss className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/devopscaptain"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-200"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex items-center gap-6 pb-3 text-xs">
          <span className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
              {newCount} NEW
            </span>
            <span className="text-muted">this week</span>
          </span>
          <span className="text-muted">
            <span className="text-body font-medium">{totalCount.toLocaleString()}</span> announcements
          </span>
          {lastUpdated && (
            <span className="flex items-center gap-1.5 text-muted ml-auto">
              <RefreshCw className="w-3 h-3" />
              {lastSynced(lastUpdated)}
            </span>
          )}
        </div>
      </div>
    </header>
  )
}
