# Next cache POC

Nextjs 14 and its app router have a number of different implicit and explicit caching options. This project tries to answer the questions of how many caching options actually exist and how they work.

The project was started as a quick investigation into this topic, but turned out to be a lot more comprehensive than I initially expected it to be.

To visualize the different caching behaviors, 3 teams of 6 pokemon are randomly chosen. When a cache is being hit, the random pokemon should be the same in all 3 teams.

(!) Caching behavior can be different depending on whether you are running the Nextjs dev server (`npm run dev`) or building the application and running the production server (`npm run build && npm start`). The following explanations focus on the production server, but will mention any differences with the dev server.

(i) In order to trigger the different caching behaviors, we had to prevent the `/api/pokemon/random` GET endpoint from being [rendered statically](#5-static-endpoint) by Nextjs.

(!) Due to my love for generation 1 pokemon (#1 - #151), it is not completely unlikely that some random pokemon picks will produce the same pokemon by chance. The `MAX_POKEMON_ID` environment variable can be adapted to decrease the chance of this happening. (Currently there are 1025 pokemon in existence.)

Let's find out how many caching mechanisms there actually are.


## 1. Request deduplication
Nextjs caches the response of a `fetch()` GET request by default. It does this by extending the browser's and Node's `fetch()` method with a `cache` option [citation].

If we want to opt out of Nextjs' default fetch caching we have to pass the `{ cache: 'no-store' }` option to the fetch method.

E.g.:
```javascript
await fetch(
  `${process.env.NEXT_URL}/api/pokemon/random`, 
  { cache: 'no-store' },
)
```

Opting out of `fetch()` caching does still render the same pokemon in all 3 teams though. This is the result of Nextjs' request deduplication. When Nextjs identifies multiple `fetch()` GET requests to the same URL during the rendering of a page, it groups these requests and only sends a single request to the URL.

(i) This caching behavior is scoped to a single page render and will result in a different pokemon on every page load or refresh.

(i) This caching behavior is not active on the dev server.


## 2. Fetch cache
Nextjs implicitely caches the response of `fetch()` GET requests. To make this behavior explicit, you can pass the `{ cache: 'force-cache' }` option to the `fetch()` request.

E.g.:
```javascript
await fetch(
  `${process.env.NEXT_URL}/api/pokemon/random`, 
  { cache: 'force-cache' },
)
```

(!) Due to an [observed weirdness](#weirdness-observed), `fetch()` caching is enabled explicitely in this project.

(i) This cache lives on the server and exists as long as the server is running. (Relaunching the server from the same machine without clearing the `.next` folder will preserve the fetch cache between server launches.)

(i) When running the dev server you can disable this cache by sending the `Cache-Control: no-cache` header in the request (or checking the `disable cache` option in your browser's dev tools). The `Cache-Control` header has no effect on the production server.


## 3. React cache
If you want the same behavior as [request deduplication](#1-request-deduplication) but your data does not come from a single `fetch()` GET request (e.g.: querying a database, doing some preparation before sending a GET request, using another http library), you can use React's `cache()` method.

E.g.:
```javascript
// src/app/pokemon/pokemon.service.ts
cache(() => { 
  console.log('🚀 React cache miss')
  return fetch(
    `${process.env.NEXT_URL}/api/pokemon/random?from=react-cache`,
  ).then(res => res.json()) 
})
```

React's `cache()` method utilizes memoization to return the same result for function invocations with the same arguments without having to run the function again [citation]. 

(i) Since this memoization is scoped to a single page render, the behavior is the same as [request deduplication](#1-request-deduplication). The behavior is however not limited to `fetch()` GET requests.

(i) To prevent the `fetch()` request from being picked up by [request deduplication](#1-request-deduplication), a dummy query parameter (`from=react-cache`) is added to the request URL.

(i) Unlike [request deduplication](#1-request-deduplication), the React cache is not affected by the `Cache-Control: no-store` header (when running the dev server).


## 4. Nextjs cache
If you want the same behavior as the [fetch cache](#2-fetch-cache) but your data does not come from a single `fetch()` GET request (e.g.: reading a file, fetching data from a POST request, needing multiple GET requests), you can use Nextjs' `cache()` method.

(!) At the time of writing, this method is still called `unstable_cache()`.

E.g.:
```javascript
// src/app/pokemon/pokemon.service.ts
unstable_cache(async () => {
  console.log('🛸 Nextjs cache miss')
  return fetch(
    `${process.env.NEXT_URL}/api/pokemon/random?from=nextjs-cache`,
  ).then(res => res.json())
}, ['pokemon'], { tags: ['pokemon'] })
```

The second argument is an array of cache key parts, in the third, optional options object we can specify one or more tags that can be used to invalidate the cache (see [Nextjs cache invalidation](#nextjs-cache-invalidation)) or specify a time after which the cache should be invalidated.

(i) Unlike the [React cache](#3-react-cache), but like the [fetch cache](#2-fetch-cache), the Nextjs cache persists between multiple page renders and lives as long as the server is running. (Relaunching the server from the same machine without clearing the `.next` folder will preserve the Nextjs cache between server launches.)

(i) To prevent the `fetch()` request from being picked up by [request deduplication](#1-request-deduplication), a dummy query parameter (`from=nextjs-cache`) is added to the request URL.

(i) As with the [fetch cache](#2-fetch-cache), you can disable this cache by sending the `Cache-Control: no-cache` header (only when running the dev server).

### Nextjs cache invalidation
If you provide one or more tags to the Nextjs `cache()` (`unstable_cache()`) method (see the 3rd argument), you can clear that cache specifically by calling `revalidateTag()` in a server action or route handler.

E.g.:
```javascript
// src/app/pokemon/pokemon.service.ts
unstable_cache(async () => {
  ...
}, ['pokemon'], { tags: ['pokemon'] })
```

```javascript
// src/app/api/clear-cache/route.ts
export function GET() {
  revalidateTag('pokemon')
  return NextResponse.json({ success: true })
}
```


## 5. Static endpoint
As well as static pages, Nextjs will prerender GET route handlers statically during the build process. 

This means that during the build process a random pokemon is picked which will be served any time the GET route is being called.

You can opt out of this behavior by reading the `headers()` or `cookies()`, or calling `noStore()` (currently called `unstable_noStore()`) in the route handler, or by specifying `export const dynamic = 'force-dynamic'` in the route file.

(i) In this project the statically rendered route is `/api/pokemon/static`.

(i) This cache is embedded in the built code bundle and will persist untill a new build process creates a new code bundle.

(i) Since there is no build step when running the dev server, this cache only applies to the production server.


## 6. Full route cache
Once Nextjs has dynamically rendered a page for the first time, it will be cached in memory for x minutes in the full route cache [citation] [question].

During that time, navigating between the cached pages will imediately render the page from memory without consulting the server.

(i) This cache lives in the memory of a single browser tab and is lost on a page refresh.

(i) Since this is a memory cache without server intervention, the `Cache-Control` header has no effect on this cache.


## Busting the caches
Because a pokemon team usually consists of 6 pokemon, and to find out how to do it, a 6th pokemon is added to each team which circumvents all the identified caches, except the [full route cache](#6-full-route-cache).

It does so by utilizing the oldest trick in the book; by adding a random query parameter to the request URL. (Usually the timestamp is the query parameter of choice, but in our project, multiple requests are made during the same millisecond so a random number is added to the URL instead.)

E.g.:
```javascript
await fetch(`${process.env.NEXT_URL}/api/pokemon/random?r=${Math.random()}`)
```

Since the URL is now different for every `fetch()` request, the requests are not applicable to the [request duplication](#1-request-deduplication) and [fetch cache](#2-fetch-cache). We can, of course, simply choose not to use the [React cache](#3-react-cache) and [Nextjs cache](#4-nextjs-cache), so that's what we did. And finally, to opt out of the [static endpoint](#5-static-endpoint), the `/api/pokemon/random` route file exports the const `dynamic = 'force-dynamic'`.

The only cache that still applies to these pokemon is the [full route cache](#6-full-route-cache).


## Path revalidation
To invalidate all server and memory caches on a certain path (page or route) you can call the `revalidatePath()` method in a server action or route handler.

E.g.:
```javascript
export async function clearTypesCache() {
  revalidatePath('/types')
}
```

(i) Path revalidation has no effect on [static endpoints](#5-static-endpoint).


## Weirdness observed

* `{ cache: 'force-cache' }` is the default for `fetch()` GET requests, but if you already made a `fetch()` request with `{ cache: 'no-store' }`, a subsequent `fetch()` request that ommits the request options will not default to `{ cache: 'force-cache' }`.

* When running the dev server, [request deduplication](#1-request-deduplication) is only active for the very first page render after the server has started and not for any subsequent page renders.

* When running the dev server, [Nextjs cache invalidation](#nextjs-cache-invalidation) and [path invalidation](#path-revalidation) breaks the [Nextjs cache](#4-nextjs-cache) during the resulting page rerender (when using a server action) or the next page rerender (when calling an API endpoint), but does not break the [fetch cache](#2-fetch-cache).
