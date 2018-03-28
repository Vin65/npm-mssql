'use strict';

const StagingDbConfig = require('./StagingDbConfig');
const ProductionDbConfig = require('./ProductionDbConfig');

class DbConfigFactory {
  static build(environment, dbConfig) {
    console.log('^Environment^', environment);
    let klass = ProductionDbConfig;

    return new klass(dbConfig);
  }
}

module.exports = DbConfigFactory;