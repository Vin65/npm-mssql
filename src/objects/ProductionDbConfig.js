'use strict';

const MssqlClient = require('./MssqlClient');
const MssqlQuery = require('./../lib/MssqlQuery');

class ProductionDbConfig {
  constructor(dbConfig) {
    this.dbConfig = dbConfig;
    this.configs = {};
    this._addConfigs(
      [{
        dataSource: this.dbConfig.database,
        host: this.dbConfig.server
      }]
    );
  }

  _config(database, server) {
    let config = this.dbConfig.copy();
    config.database = database.toLowerCase();
    config.server = server;
    return config;
  }

  _addConfigs(datasources, callback) {
    datasources.forEach((datasource) => {
      this.configs[datasource.dataSource.toLowerCase()] = this._config(datasource.dataSource, datasource.host);
    });
    if (callback) callback();
  }

  _fetchDatasources() {
    let mssqlClient = new MssqlClient(this.dbConfig);
    return mssqlClient.execute(MssqlQuery.select.datasource()).then(queryResults => {
      if (queryResults.recordsets[0].length) {
        return queryResults.recordsets[0];
      }
    }).catch(error => {
      console.error(error);
    });
  }

  async for_(database) {
    let self = this;
    let config = self.configs[database.toLowerCase()];
    if (config) return config;

    await self._addConfigs(await self._fetchDatasources(), function () {
      config = self.configs[database.toLowerCase()];
    });

    return config;
  }
}

module.exports = ProductionDbConfig;