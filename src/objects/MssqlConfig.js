'use strict';

const DbConfig = require('./DbConfig');
const DbConfigFactory = require('./DbConfigFactory');

let singleton;

class MssqlConfig {
  static masterDatasource() {
    return 'vin65master';
  }

  static singleton(environment, ...args) {
    if (!singleton) {
      const dbConfig = new DbConfig(args[0], args[1], args[2], args[3]);
      singleton = DbConfigFactory.build(environment, dbConfig);
    }

    return singleton;
  }

  static resetSingleton() {
    singleton = null;
  }
}

module.exports = MssqlConfig;