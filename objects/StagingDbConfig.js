'use strict';

class StagingDbConfig {
  constructor(dbConfig) {
    this.dbConfig = dbConfig;
  }
  
  async for_(database) {
    let config = Object.assign({}, this.dbConfig);
    config.database = database.toLowerCase();
    return config;
  }
}

module.exports = StagingDbConfig;
