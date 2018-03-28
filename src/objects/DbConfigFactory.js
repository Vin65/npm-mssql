'use strict';

const StagingDbConfig = require('./StagingDbConfig');
const ProductionDbConfig = require('./ProductionDbConfig');

class DbConfigFactory {
  static build(environment, dbConfig) {
    console.log('^Environment^', environment);
    let klass = (environment === 'production') ? ProductionDbConfig : StagingDbConfig;

    return new klass(dbConfig);
  }
}

module.exports = DbConfigFactory;