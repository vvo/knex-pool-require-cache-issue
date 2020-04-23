# knex-pool-require-cache-issue

**Update April 23, 2020** I managed to fix this issue with the help of the community. If you're having issues using knex and Next.js in development (or any other dev server) then have a look at the file [lib/db-knex-fixed.js](./lib/db-knex-fixed.js).

---

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

**Terminal server output**:

```text
error: sorry, too many clients already
    at Connection.parseE (/Users/vvo/Dev/knex-pool-require-cache-issue/node_modules/pg/lib/connection.js:600:48)
    at Connection.parseMessage (/Users/vvo/Dev/knex-pool-require-cache-issue/node_modules/pg/lib/connection.js:399:19)
    at Socket.<anonymous> (/Users/vvo/Dev/knex-pool-require-cache-issue/node_modules/pg/lib/connection.js:115:22)
    at Socket.emit (events.js:310:20)
    at addChunk (_stream_readable.js:286:12)
    at readableAddChunk (_stream_readable.js:268:9)
    at Socket.Readable.push (_stream_readable.js:209:10)
    at TCP.onStreamRead (internal/stream_base_commons.js:186:23) {
  name: 'error',
  length: 85,
  severity: 'FATAL',
  code: '53300',
  detail: undefined,
  hint: undefined,
  position: undefined,
  internalPosition: undefined,
  internalQuery: undefined,
  where: undefined,
  schema: undefined,
  table: undefined,
  column: undefined,
  dataType: undefined,
  constraint: undefined,
  file: 'proc.c',
  line: '361',
  routine: 'InitProcess'
}
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

## Using knex with global object

```bash
npm run knex-server-fixed

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
