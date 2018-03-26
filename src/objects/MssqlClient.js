'use strict';

const mssql = require('mssql');

class MssqlClient {
  constructor(dbConfig) {
    this.dbConfig = dbConfig;
  }

  execute(query, params) {
    return new mssql.ConnectionPool(this.dbConfig.toString()).connect().then(function (pool) {
      pool = pool.request();
      for (var key in params) {
        pool = pool.input(key, params[key]);
      }
      pool = pool.query(query);
      return pool;
    }).then(function (queryResults) {
      mssql.close();
      return queryResults;
    }).catch(function (error) {
      console.error('npm-mssql error:', error);
      mssql.close();
      throw error;
    }).finally(function () {
      mssql.close();
    })
  }
}

module.exports = MssqlClient;