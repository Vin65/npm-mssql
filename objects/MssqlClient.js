'use strict';

const mssql = require('mssql');

class MssqlClient {
  constructor(config) {
    this.setConfig(config);
  }
  
  setConfig(config) {
    this.datasource = config.datasource;
    this.server     = config.server;
    this.username   = config.username;
    this.password   = config.password;
  }
  
  _config() {
    return {
      user:       this.username,
      password:   this.password,
      server:     this.server,
      database:   this.datasource
    };
  } 
  
  execute(query, params) {
    return mssql.connect(this._config()).then(pool => {
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