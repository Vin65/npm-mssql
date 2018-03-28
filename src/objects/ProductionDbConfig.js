'use strict';

const MssqlClient = require('./MssqlClient');
const MssqlQuery = require('./../lib/MssqlQuery');

class ProductionDbConfig {
  constructor(dbConfig) {
    this.dbConfig = dbConfig;
    this.configs = {};
    console.log('dbconfig.database', this.dbConfig.database)
    console.log('dbconfig.server', this.dbConfig.server)
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

    console.log('config', JSON.stringify(config));

    return config;
  }

  _addConfigs(datasources) {
    console.log(datasources, JSON.stringify(datasources))
    datasources.forEach((datasource) => {
      console.log(`datasource: ${datasource} config`, JSON.stringify(this._config(datasource.dataSource, datasource.host)));
      this.configs[datasource.dataSource.toLowerCase()] = this._config(datasource.dataSource, datasource.host);
    });
  }

  _fetchDatasources() {
    let mssqlClient = new MssqlClient(this.dbConfig);
    return mssqlClient.execute(MssqlQuery.select.datasource()).then(queryResults => {
      console.log('fetchedDatasources', JSON.stringify(queryResults));
      if (queryResults.recordsets[0].length) {
        console.log('datasources found!!!');
        return queryResults.recordsets[0];
      }
      console.log('datasources not found...');
    }).catch(error => {
      console.error(error);
    });
  }

  async for_(database) {
    console.log('for', database)
    let config = this.configs[database.toLowerCase()];
    console.log('for_ config 1#:', JSON.stringify(config))
    if (!config) {
      console.log('for_ config 2#:');
      this.addConfigs(await this._fetchDatasources());
    }

    console.log('for_ config 3#:', JSON.stringify(this.configs[database.toLowerCase()]))

    return this.configs[database.toLowerCase()];
  }
}

module.exports = ProductionDbConfig;