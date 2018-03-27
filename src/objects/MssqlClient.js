'use strict';

const mssql = require('mssql');

class MssqlClient {
  constructor(dbConfig) {
    this.dbConfig = dbConfig;
  }

  execute(query, params) {
    console.log('Create MSSQL Connection Pool');
    return new mssql.ConnectionPool(this.dbConfig.toString()).connect().then(function (pool) {
      console.log('Grab MSSQL pool request.');
      pool = pool.request();
      for (var key in params) {
        pool = pool.input(key, params[key]);
      }
      console.log('Run query on MSSQL Pool.', JSON.stringify(query));
      pool = pool.query(query);
      return pool;
    }).then(function (queryResults) {
      console.log('MSSQL Success, close connection pool.');
      mssql.close();
      return queryResults;
    }).catch(function (error) {
      console.log('MSSQL Fail, close connection pool.');
      mssql.close();
      throw error;
    }).finally(function () {
      console.log('MSSQL finally close connection pool.');
      mssql.close();
    })
  }
}

module.exports = MssqlClient;