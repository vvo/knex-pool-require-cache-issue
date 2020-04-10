# knex-pool-require-cache-issue

This example demonstrate an issue you can face when using [knex](https://knexjs.org/) pooling (that's the default) together with a system that wipes out require.cache, like [Next.js](https://nextjs.org/) does to provide server-side hot reloading.

It also shows that the pooling system from [node-postgres](https://github.com/brianc/node-postgres/) is resilient to the issue.

## Setup

```bash
npm install
docker-compose up -d

node -v
v12.16.2

npm -v
6.14.4
```

## Using knex pooling

```bash
npm run knex-server

# in another terminal
npm run test
```

**Result**:

```text
> npm run test

> knex-pool-require-cache-issue@1.0.0 test /Users/vvo/Dev/knex-pool-require-cache-issue
> for i in `seq 1 20`; do curl http://localhost:3000; done

okay
okay
okay
okay
okay
okay
okay
okay
okay
okay
okay
okay
okay
okay
okay
not ok, check the terminal of your Node.js server
not ok, check the terminal of your Node.js server
not ok, check the terminal of your Node.js server
not ok, check the terminal of your Node.js server
not ok, check the terminal of your Node.js server
```

## Using node-postgres pooling

(remember to stop the previous server)

```bash
npm run pg-server

# in another terminal
npm run test
```

**Result**:

```text
> npm test

> knex-pool-require-cache-issue@1.0.0 test /Users/vvo/Dev/knex-pool-require-cache-issue
> for i in `seq 1 20`; do curl http://localhost:3000; done

okayokayokayokayokayokayokayokayokayokayokayokayokayokayokayokayokayokayokayokay
```
