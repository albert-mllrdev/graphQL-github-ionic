import { InMemoryCache } from 'apollo-cache-inmemory';

export type GetCacheKeyFn = (args: Record<any, any>) => string;

export type CustomResolver<R = any, A = Record<any, any>> = (
  rootValue: R,
  args: A,
  context: {
    [key: string]: any;
    cache: InMemoryCache;
    getCacheKey: GetCacheKeyFn;
  },
) => any;
