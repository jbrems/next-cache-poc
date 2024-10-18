import { CacheInfo } from "./cache.types";

export function CacheInfoLabel({ cacheInfo }: { cacheInfo: CacheInfo }) {
  const cacheInfoLabels: Record<CacheInfo, string> = {
    REQUEST_DEDUPLICATION: `Request dedupe`,
    FETCH_CACHE: `Fetch cache`,
    REACT_CACHE: 'React cache',
    NEXTJS_CACHE: 'Nextjs cache',
    STATIC_ENDPOINT: 'Static endpoint',
    CACHE_BUST: 'Cache bust',
    FULL_ROUTE_CACHE: 'Full route cache'
  }
  return <span className="text-xs text-neutral-500 -mb-3">{cacheInfoLabels[cacheInfo]}</span>
}