// Token metadata caching to reduce API calls

interface CachedToken {
  metadata: any;
  timestamp: number;
}

const cache = new Map<string, CachedToken>();
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

export function getCachedMetadata(mint: string): any | null {
  const cached = cache.get(mint);
  if (!cached) return null;
  
  if (Date.now() - cached.timestamp > CACHE_DURATION) {
    cache.delete(mint);
    return null;
  }
  
  return cached.metadata;
}

export function setCachedMetadata(mint: string, metadata: any) {
  cache.set(mint, {
    metadata,
    timestamp: Date.now()
  });
}

export function clearCache() {
  cache.clear();
}
