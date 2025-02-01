## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## TypeORM CLI

```bash
# create migration
> npm run typeorm migration:create ./src/migrations/CreateGroupsTable

# revert migration
> npm run typeorm migration:revert --dataSource ./src/data-source.ts


```
