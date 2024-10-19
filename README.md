# Next cache POC

Nextjs 14 and its app router has a number of different implicit and explicit caching options. What exactly is that number? Let's find out.

This project is the result of what I thought would be a little investigation into this topic but turned out to be a deep dive in the wonderful world of Nextjs caching.

To visualize the caching behavior 3 teams of 6 random pokemon are chosen. When a cache is being hit, the "random" pokemon will be the same in all 3 teams.

(!) Caching behavior can be different depending on whether you are running the Nextjs dev server (`npm run dev`) or building the application and running the production server (`npm run build && npm start`). The main explanation focuses on the production server.

(!) Due to my love for gen 1 pokemon (#1 - #151), it is not very unlikely that multiple random picks result in the same pokemon. The `MAX_POKEMON_ID` environment variable can be changed to your desire.


## 1. Request deduplication
Nextjs caches the response of a fetch GET request by default. It does this by extending the browser's and Node's `fetch` method with a `cache` option [citation].

If we want to opt out of Nextjs' default fetch caching we have to pass the `{ cache: 'no-store' }` option to the fetch method.

E.g.:
```javascript
fetch(`${process.env.NEXT_URL}/api/pokemon/random`, { cache: 'no-store' })
```

Opting out of fetch caching does still render the same pokemon in all 3 teams though.

This is the result of Nextjs' request deduplication. When Nextjs identifies multiple requests to the same URL during the rendering of a page, it only sneds a single request to that URL.

(i) This caching behavior is scoped to a single page render and will result in a different pokemon on every page load/refresh.

(i) This caching behavior only happens during the first page load when running the dev server. It does not happen when you refresh the page for some reason [question].


## 2. Fetch cache
As mentioned before, Nextjs implicitely caches the response of fetch GET requests. To make this behavior explicit, you can pass the `{ cache: 'force-cache' }` option to the fetch request.

E.g.:
```javascript
fetch(`${process.env.NEXT_URL}/api/pokemon/random`, { cache: 'force-cache' })
```

(!) While this cache should be enabled by default, it has been observerd that calling a fetch GET request without explicit cache option after having called a fetch GET request to the same URL with `{ cache: 'no-store' }` breaks the default caching behavior of the fetch method. This is why, in this project, you will find explicit mentions of the `{ cache: 'force-cache' }` option.

(i) This cache lives on the server and exists as long as the server is running. 

(i) When running the dev server you can disable this cache by sending the `Cache-Control: no-cache` header in the request (or checking the `disable cache` option in your browser's dev tools). The `Cache-Control` header has no influence on the production server.


## 3. React cache
If you want the same behavior as the [request deduplication](#1-request-deduplication) but your data does not come from a single fetch GET request (e.g.: querying a database, doing some preparation before sending a GET request), you can use React's `cache` method.

E.g.:
```javascript
cache(() => { 
  console.log('🚀 React cache miss')
  return fetch(`${process.env.NEXT_URL}/api/pokemon/random?from=react-cache`).then(res => res.json()) 
})
```

React's `cache` method utilizes memoization to return the same result for function invocations with the same arguments without having to run the function again [citation]. 

(i) Since this memoization is scoped to a single page render, the behavior is the same as [request deduplication](#1-request-deduplication). The behavior is however not limited to fetch GET requests.

(i) To prevent the fetch request in the single function run being picked up by the [request deduplication](#1-request-deduplication), a dummy query parameter (`from=react-cache`) is added to the request URL.

(i) Unlike [request deduplication](#1-request-deduplication), the React cache is not affected by the `Cache-Control: no-store` header (when running the dev server).


## 4. Nextjs cache
If you want the same behavior as the [fetch cache](#2-fetch-cache) but your data does not come from a single fetch GET request (e.g.: reading a file, fetching data from a POST request), you can use Nextjs' `cache` method.

(!) At the time of writing, this method is still called `unstable_cache`.

E.g.:
```javascript
unstable_cache(async () => {
  console.log('🛸 Nextjs cache miss')
  return fetch(`${process.env.NEXT_URL}/api/pokemon/random?from=nextjs-cache`).then(res => res.json())
}, ['pokemon'], { tags: ['pokemon'] })
```

The second argument is an array of cache key parts, in the third, optional options object we can specify one or more tags that can be used to invalidate the cache (see [Nextjs cache invalidation](#nextjs-cache-invalidation)) or specify a time after which the cache should be invalidated.

(i) Unlike the [React cache](#3-react-cache) and more like the [fetch cache](#2-fetch-cache), the Nextjs cache persists between multiple page renders and lives as long as the server is running.

(i) To prevent the fetch request in the very first page render from being picked up by the [request deduplication](#1-request-deduplication), a dummy query parameter (`from=nextjs-cache`) is added to the request URL.

(i) As with the [fetch cache](#2-fetch-cache) you can disable this cache by sending the `Cache-Control: no-cache` header (when running the dev server).

### Nextjs cache invalidation
[TODO]


## 5. Static endpoint
As well as static pages, Nextjs will also prerender GET route handlers statically during the build process. 

This means that during the build process a random pokemon is picked which will be served any time the GET route is being hit.

(i) This cache is embedded in the built bundle and will persist untill the next build process.

(i) You can opt out of this behavior by reading the `headers()` or `cookies()`, or calling `noStore()` (currently called `unstable_noStore()`) in the route handler, or by specifying `export const dynamic = 'force-dynamic'` in the route file.

(i) Since there is no build step when running the dev server, this cache only applies to the production server.


## 6. Full route cache
[TODO]

## Busting the caches
Because a pokemon team usually consists of 6 pokemon, and to find out how to do it, a 6th pokemon is added to the team which circumvents all the caches except the [full route cache](#6-full-route-cache).

It does so by utilizing the oldest trick in the book; by adding a random query parameter to the request URL. (Usually the timestamp is the query parameter of choice, but in our case, multiple requests are made during the same millisecond.) Since the URL is different, the request does not fall under the [request duplication](#1-request-deduplication) and [fetch cache](#2-fetch-cache). Of course we can simply choose not to use the [React cache](#3-react-cache) and [Nextjs cache](#4-nextjs-cache). To opt out of the [static endpoint](#5-static-endpoint) the `/api/pokemon/random` route file exports the const `dynamic = 'force-dynamic'`.

The only cache that still applies to these pokemon is the [full route cache](#6-full-route-cache).


## Path revalidation
[TODO]


## Weirdness observed

* `{ cache: 'force-cache' }` is the default for fetch requests, but if you already did a fetch with `{ cache: 'no-store' }`, a subsequent fetch request that ommits the request options will not default to `{ cacheL 'force-cache' }`.

* GET requests and POST requests (server actions) have a separate fetch cache.