'use strict';

const StagingDbConfig = require('./StagingDbConfig');
const ProductionDbConfig = require('./ProductionDbConfig');

class DbConfigFactory {
  static build(environment, dbConfig) {
    let klass = ProductionDbConfig;

    return new klass(dbConfig);
  }
}

module.exports = DbConfigFactory;