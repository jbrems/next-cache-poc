import { CacheInfo } from "./cache.types";

export function CacheInfoLabel({ cacheInfo }: { cacheInfo: CacheInfo }) {
  const cacheInfoLabels: Record<CacheInfo, string> = {
    NO_CACHE: `Fetch 'no-store'`,
    FETCH_CACHE: `Fetch 'force-cache'`,
    REACT_CACHE: 'React cache()',
    NEXT_CACHE: 'Next cache()',
    STATIC_ENDPOINT: 'Static endpoint',
    CACHE_BUST: 'Cache bust',
    PAGE_CACHE: 'No label'
  }
  return <span className="text-xs text-neutral-500 -mb-3">{cacheInfoLabels[cacheInfo]}</span>
}