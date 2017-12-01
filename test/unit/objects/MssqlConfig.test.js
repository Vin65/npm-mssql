'use strict';

import MssqlConfig from './../../../objects/MssqlConfig';
import ProductionMssqlConfig from './../../../objects/ProductionMssqlConfig';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

chai.use(require("chai-as-promised"));
chai.use(require("sinon-chai"));

describe('MssqlConfig', () => { 
  describe('.masterDatasource', () => {
    it("should be 'vin65master'", () => {
      expect(MssqlConfig.masterDatasource()).to.equal('vin65master');
    });
  });
  
  describe('.config', () => {
    it("should have 'datasource' as property", () => {
      expect(MssqlConfig.config()).to.have.property('datasource');
    });
    
    it("should have 'server' as property", () => {
      expect(MssqlConfig.config()).to.have.property('server');
    });
    
    it("should have 'username' as property", () => {
      expect(MssqlConfig.config()).to.have.property('username');
    });
    
    it("should have 'password' as property", () => {
      expect(MssqlConfig.config()).to.have.property('password');
    });
  });
  
  describe('.singleton', () => {
    context('when no environment is specified', () => {
      let singleton;
      
      before(function() {
        singleton = MssqlConfig.singleton();
      });
      
      after(function() {
        MssqlConfig.resetSingleton();
      });
      
      it("should return an instance of MssqlConfig", () => {
        expect(singleton).to.be.an.instanceof(MssqlConfig);
      });
      
      it("should return same object", () => {
        expect(singleton).to.equal(MssqlConfig.singleton());
      });
    });
    
    context("when environment is specified as 'production'", () => {
      let singleton;
      
      before(function() {
        singleton = MssqlConfig.singleton('production');
      });
      
      after(function() {
        MssqlConfig.resetSingleton();
      });
      
      it("should return an instance of ProductionMssqlConfig", () => {
        expect(singleton).to.be.an.instanceof(ProductionMssqlConfig);
      });
      
      it("should return same object", () => {
        expect(singleton).to.equal(ProductionMssqlConfig.singleton());
      });
    });
  });
  
  describe('#for', () => {
    let singleton;
    
    before(function() {
      singleton = MssqlConfig.singleton();
    });
    
    after(function() {
      MssqlConfig.resetSingleton();
    });
    
    it('should return config for masterDatasource', async () => {
      let promise = Promise.resolve(singleton.for_(MssqlConfig.masterDatasource()));
      expect(promise).to.eventually.have.property('datasource', MssqlConfig.masterDatasource());
    });
    
    it('should return config for any-datasource', async () => {
      let promise = Promise.resolve(singleton.for_('any-datasource'));
      expect(promise).to.eventually.have.property('datasource', 'any-datasource');
    });
  });
});