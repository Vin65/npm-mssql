'use strict';

const mssql = require('mssql');

class MssqlClient {
  constructor(dbConfig) {
    this.dbConfig = dbConfig;
  }

  execute(query, params) {
    return new mssql.ConnectionPool(this.dbConfig.toString()).connect().then(pool => {
      pool = pool.request();
      for (var key in params) {
        pool = pool.input(key, params[key]);
      }
      pool = pool.query(query);
      return pool;
    }).then(queryResults => {
      mssql.close();
      return queryResults;
    }).catch(error => {
      mssql.close();
      throw error;
    });
  }
}

module.exports = MssqlClient;