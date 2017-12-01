'use strict';

const MssqlClient = require('./MssqlClient');

const MSSQL_SERVER    = process.env.MSSQL_SERVER;
const MSSQL_USERNAME  = process.env.MSSQL_USERNAME;
const MSSQL_PASSWORD  = process.env.MSSQL_PASSWORD;

let singleton;

class MssqlConfig {
  constructor(mssqlClient) {
    this.masterDatasourceConfig = this.constructor.config(this.constructor.masterDatasource(), MSSQL_SERVER, MSSQL_USERNAME, MSSQL_PASSWORD);
    this.mssqlClient = mssqlClient || new MssqlClient(this.masterDatasourceConfig);
  }
  
  static masterDatasource() {
    return 'vin65master';
  }
  
  static config(datasource, server, username, passsword) {
    return {
      datasource: datasource,
      server:     server,
      username:   username  || MSSQL_USERNAME,
      password:   passsword || MSSQL_PASSWORD
    };
  }
  
  static singleton(environment) {
    if (!singleton) {
      if (environment === 'production') {
        const ProductionMssqlConfig = require('./ProductionMssqlConfig');
        singleton = new ProductionMssqlConfig();
      } else {
        singleton = new MssqlConfig();
      }
    }
    return singleton;
  }
  
  static resetSingleton() {
    singleton = null;
  }
  
  for_(datasource) {
    let config = this.masterDatasourceConfig;
    config.datasource = datasource.toLowerCase();
    return config;
  }
}

module.exports = MssqlConfig; 
