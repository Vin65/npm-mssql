'use strict';

const MssqlQuery = require('./../lib/MssqlQuery');

import MssqlConfig from './MssqlConfig';

let singleton;

class ProductionMssqlConfig extends MssqlConfig {
  constructor(mssqlClient) {
    super(mssqlClient);
    this.datasources = {};
    
    this.addDatasource(this.masterDatasourceConfig.datasource, this.masterDatasourceConfig.server, 
      this.masterDatasourceConfig.username, this.masterDatasourceConfig.password);
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
      this.addDatasources(await this.fetchDatasources());
    }
    
    config = this.datasources[datasource.toLowerCase()];
    return config;
  }
}

module.exports = ProductionMssqlConfig; 
