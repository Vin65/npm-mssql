'use strict';

import MssqlConfig from './../../../objects/MssqlConfig';
import StagingDbConfig from './../../../objects/StagingDbConfig';
import ProductionDbConfig from './../../../objects/ProductionDbConfig';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));

describe('MssqlConfig', () => { 
  describe('.masterDatasource', () => {
    it("should be 'vin65master'", () => {
      expect(MssqlConfig.masterDatasource()).to.equal('vin65master');
    });
  });
  
  describe('.singleton', () => {
    context('when environment is specified as null', () => {
      let singleton;
      
      before(function() {
        singleton = MssqlConfig.singleton(null, 'datasource', '127.0.0.1', 'Us3r', 'P4ssw0rd!');
      });
      
      after(function() {
        MssqlConfig.resetSingleton();
      });
      
      it("should return an instance of StagingDbConfig", () => {
        expect(MssqlConfig.singleton()).to.be.an.instanceof(StagingDbConfig);
      });
      
      it("should return same object", () => {
        expect(MssqlConfig.singleton()).to.equal(singleton);
      });
      
      describe('#for_', () => {
        it("should return config for 'datasource'", async () => {
          let promise = Promise.resolve(MssqlConfig.singleton().for_('datasource'));
          expect(promise).to.eventually.have.property('database', 'datasource');
        });
        
        it('should return config for any-datasource', async () => {
          let promise = Promise.resolve(MssqlConfig.singleton().for_('any-database'));
          expect(promise).to.eventually.have.property('database', 'any-database');
        });
      });
    });
    
    context("when environment is specified as 'production'", () => {
      let singleton;
      
      before(function() {
        singleton = MssqlConfig.singleton('production', 'datasource', '127.0.0.1', 'Us3r', 'P4ssw0rd!');
      });
      
      after(function() {
        MssqlConfig.resetSingleton();
      });
      
      it("should return an instance of ProductionDbConfig", () => {
        expect(MssqlConfig.singleton()).to.be.an.instanceof(ProductionDbConfig);
      });
      
      it("should return same object", () => {
        expect(MssqlConfig.singleton()).to.equal(singleton);
      });
      
      describe('#for_', () => {
        it("should return config for 'datasource'", async () => {
          let promise = Promise.resolve(MssqlConfig.singleton().for_('datasource'));
          expect(promise).to.eventually.have.property('database', 'datasource');
        });
        
        it('should return config for any-datasource', async () => {
          let promise = Promise.resolve(MssqlConfig.singleton().for_('any-database'));
          expect(promise).to.eventually.have.property('database', 'any-database');
        });
      });
    });
  });
});