'use strict';

import DbConfig from './../../../objects/DbConfig';
import DbConfigFactory from './../../../objects/DbConfigFactory';
import StagingDbConfig from './../../../objects/StagingDbConfig';
import ProductionDbConfig from './../../../objects/ProductionDbConfig';

const chai = require('chai');
const expect = chai.expect;

chai.use(require('chai-as-promised'));

describe('DbConfigFactory', () => {
  describe('.build', () => {
    let dbConfig = DbConfig.build('datasource', '10.81.0.1', 'Us3r', 'P4ssw0rd!');
      
    it("should return instance of ProductionDbConfig when environment is set to 'production'", () => {
      expect(DbConfigFactory.build('production', dbConfig)).to.be.an.instanceof(ProductionDbConfig);
    });
    
    it("should return instance of StagingDbConfig when environment is set to 'anything-else'", () => {
      expect(DbConfigFactory.build('anything-else', dbConfig)).to.be.an.instanceof(StagingDbConfig);
    });
    
    it('should return instance of StagingDbConfig when environment is set to null', () => {
      expect(DbConfigFactory.build(null, dbConfig)).to.be.an.instanceof(StagingDbConfig);
    });
  });
});