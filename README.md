# Hazzard

[![Build status](http://travis-ci.org/mramshaw/Hazzard.svg?branch=master)](http://travis-ci.org/mramshaw/Hazzard) [![Coverage Status](http://codecov.io/github/mramshaw/Hazzard/coverage.svg?branch=master)](http://codecov.io/github/mramshaw/Hazzard?branch=master)

[![Known Vulnerabilities](https://snyk.io//test/github/mramshaw/Hazzard/badge.svg?style=plastic&targetFile=package.json)](https://snyk.io//test/github/mramshaw/Hazzard?style=plastic&targetFile=package.json)

A simple RESTful endpoint with __node.js__ using [express](http://www.npmjs.com/package/express) and [superagent](http://www.npmjs.com/package/superagent).

Logging will be carried out with [morgan](http://www.npmjs.com/package/morgan).

## Configuration defaults

By default the app will run on `localhost` port `5000`, but other values may be specified as follows:

```bash
export HOST=127.0.0.1
```

Or:

```bash
export PORT=3333
```

## Linting

Code linting will be carried out with [ESLint](https://eslint.org/).

Lint the code as follows:

```bash
npm run -s eslint .
```

## Testing

Test the app as follows:

```bash
npm test
```

## Running

Start the app as follows:

```bash
npm start
```

As usual, Ctrl-C to stop.

## To Do

- [x] Add various badges
- [x] Dockerize everything
