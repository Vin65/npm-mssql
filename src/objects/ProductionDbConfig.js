'use strict';

const MssqlClient = require('./MssqlClient');
const MssqlQuery = require('./../lib/MssqlQuery');

class ProductionDbConfig {
  constructor(dbConfig) {
    this.dbConfig = dbConfig;
    this.configs = {};
    this._addConfigs(
      [
        {
          dataSource: this.dbConfig.database,
          host: this.dbConfig.server
        }
      ]
    );
  }

  _config(database, server) {
    let config = this.dbConfig.copy();
    config.database = database.toLowerCase();
    config.server = server;

    return config;
  }

  _addConfigs(datasources) {
    datasources.forEach((datasource) => {
      this.configs[datasource.dataSource.toLowerCase()] = this._config(datasource.dataSource, datasource.host);
    });
  }

  _fetchDatasources() {
    let mssqlClient = new MssqlClient(this.dbConfig.toString());
    return mssqlClient.execute(MssqlQuery.select.datasource()).then(queryResults => {
      if (queryResults.recordsets[0].length) {
        return queryResults.recordsets[0];
      }
    }).catch(error => {
      console.error(error);
    });
  }

  async for_(database) {
    let config = this.configs[database.toLowerCase()];
    if (!config) {
      this.addConfigs(await this._fetchDatasources());
    }

    return this.configs[database.toLowerCase()];
  }

  toString () {
    return this.dbConfig.toString();
  }
}

module.exports = ProductionDbConfig;