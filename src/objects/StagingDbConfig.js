'use strict';

class StagingDbConfig {
  constructor(dbConfig) {
    this.dbConfig = dbConfig;
  }

  async for_(database) {
    let config = this.dbConfig.copy();
    config.database = database.toLowerCase();
    return config;
  }
}

module.exports = StagingDbConfig;