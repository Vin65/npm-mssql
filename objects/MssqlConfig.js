'use strict';

const DbConfigFactory = require('./DbConfigFactory');
const DbConfig = require('./DbConfig');

let singleton;

class MssqlConfig {
  static masterDatasource() {
    return 'vin65master';
  }
  
  static singleton(environment, ...args) {
    if (!singleton) {
      const dbConfig = DbConfig.build(args[0], args[1], args[2], args[3])
      singleton = DbConfigFactory.build(environment, dbConfig);
    }
    
    return singleton;
  }
  
  static resetSingleton() {
    singleton = null;
  }
}

module.exports = MssqlConfig;