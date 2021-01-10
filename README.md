[![npm](https://img.shields.io/npm/v/timeseries-sqlite2leveldb.svg)](https://www.npmjs.com/package/timeseries-sqlite2leveldb)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![minified size](https://badgen.net/bundlephobia/min/timeseries-sqlite2leveldb)](https://bundlephobia.com/result?p=timeseries-sqlite2leveldb)
[![downloads](http://img.shields.io/npm/dm/timeseries-sqlite2leveldb.svg?style=flat-square)](https://npmjs.org/package/timeseries-sqlite2leveldb)
[![GitHub Issues](https://img.shields.io/github/issues/konsumation/timeseries-sqlite2leveldb.svg?style=flat-square)](https://github.com/konsumation/timeseries-sqlite2leveldb/issues)
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fkonsumation%2Ftimeseries-sqlite2leveldb%2Fbadge&style=flat)](https://actions-badge.atrox.dev/konsumation/timeseries-sqlite2leveldb/goto)
[![Styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Known Vulnerabilities](https://snyk.io/test/github/konsumation/timeseries-sqlite2leveldb/badge.svg)](https://snyk.io/test/github/konsumation/timeseries-sqlite2leveldb)
[![Coverage Status](https://coveralls.io/repos/konsumation/timeseries-sqlite2leveldb/badge.svg)](https://coveralls.io/github/konsumation/timeseries-sqlite2leveldb)

# timeseries-sqlite2leveldb

migrate time series data from sqlite to leveldb

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [sqlite2leveldb](#sqlite2leveldb)
    -   [Parameters](#parameters)

## sqlite2leveldb

Convert sqlite data into leveldb data

### Parameters

-   `sqldb` **Database** source sqlite database
-   `master` **Master** konsum master

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>** A promise that resolves after all records have been inserted

# install

With [npm](http://npmjs.org) do:

```shell
npm install timeseries-sqlite2leveldb
```

# license

# BSD-2-Clause
