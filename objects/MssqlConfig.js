'use strict';

const MssqlClient = require('./MssqlClient');
const MssqlQuery = require('./../lib/MssqlQuery');

const MSSQL_SERVER    = process.env.MSSQL_SERVER;
const MSSQL_USERNAME  = process.env.MSSQL_USERNAME;
const MSSQL_PASSWORD  = process.env.MSSQL_PASSWORD;

let singleton;

class MssqlConfig {
  constructor(environment, mssqlClient) {
    this.environment = environment;
    this.datasources = {};
    
    let masterDatasourceConfig = this.addDatasource(this.constructor.masterDatasource(), MSSQL_SERVER, MSSQL_USERNAME, MSSQL_PASSWORD);
    this.mssqlClient  = mssqlClient || new MssqlClient(masterDatasourceConfig);
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
    if (!singleton) singleton = new MssqlConfig(environment);
    return singleton;
  }
  
  addDatasource(datasource, server, username, password) {
    let config = this.constructor.config(datasource, server, username, password);
    this.datasources[datasource.toLowerCase()] = config;
    
    return config;
  }
  
  addDatasources(datasources) {
    datasources.forEach((datasource) => {
      this.addDatasource(datasource.dataSource, datasource.host)
    });
  }
  
  fetchDatasources() {
    return this.mssqlClient.execute(MssqlQuery.select.datasource()).then(queryResults => {
      if (queryResults.recordsets[0].length) {
        return queryResults.recordsets[0];
      }
    }).catch(error => {
      console.error(error);
    });
  }
  
  async for(datasource) {
    let config = this.datasources[datasource.toLowerCase()];
    if (!config) {
      if (this.environment === 'production') {
        this.addDatasources(await this.fetchDatasources());
        config = this.datasources[datasource.toLowerCase()];
      } else {
        config = this.datasources[this.constructor.masterDatasource()];
        config.datasource = datasource.toLowerCase();
      }
    }
    
    return config;
  }
}

module.exports = MssqlConfig; 
