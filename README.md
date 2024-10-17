# Next cache POCemon

## Weirdness observed

* `{ cache: 'force-cache' }` is the default for fetch requests, but if you already did a fetch with `{ cache: 'no-store' }`, a subsequent fetch request that ommits the request options will not default to `{ cacheL 'force-cache' }`.

* GET requests and POST requests (server actions) have a separate fetch cache.