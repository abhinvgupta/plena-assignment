
## Description

This is a monorepo project with 2 microservices.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# Access Management Service
$ npm run start:access

# Token Service
$ npm run start:token

```

## Run tests

```bash
# unit tests
$ npm run test

```

## Apis

Access Management Service

POST localhost:3001/access-key/create

PUT localhost:3001/access-key/update

DELETE localhost:3001/access-key/delete

localhost:3001/access-key/fetch/:accessKey

Token Service

GET localhost:3002/token/:symbol