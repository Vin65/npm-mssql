'use strict';

import MssqlClient from './../../../objects/MssqlClient';
import MssqlConfig from './../../../objects/MssqlConfig';

import MssqlMockedResponse from './../../support/MssqlMockedResponse';

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
    let singleton = MssqlConfig.singleton();
    
    it("should return an instance of MssqlConfig", () => {
      expect(singleton).to.be.an.instanceof(MssqlConfig);
    });
    
    it("should return same object", () => {
      expect(singleton).to.equal(MssqlConfig.singleton());
    });
  });
  
  describe('#addDatasource', () => {
    let config = new MssqlConfig();
    
    before(function namedFun() {
      config.addDatasource('datasource', '10.81.0.1', 'Us3r', 'P4ssw0rd!');
    });
    
    it("should add datasource", () => {  
      expect(Object.keys(config.datasources).length).to.equal(2);
    });
  });
  
  
  describe('#for', () => {
    context('when no environment is specified', () => {
      let singleton = MssqlConfig.singleton();
      
      it('should return config for masterDatasource', async () => {
        let promise = Promise.resolve(singleton.for(MssqlConfig.masterDatasource()));
        expect(promise).to.eventually.have.property('datasource', MssqlConfig.masterDatasource());
      });
      
      it('should return config for pinewines', async () => {
        let promise = Promise.resolve(singleton.for('pinewines'));
        expect(promise).to.eventually.have.property('datasource', 'pinewines');
      });
    });
    
    context("when environment is specified as 'production'", () => {
      let config = new MssqlConfig('production');
      let stub;
      
      beforeEach(function() {
        stub = sinon.stub(MssqlClient.prototype, 'execute');
        stub.resolves(MssqlMockedResponse.datasource('pinewines', '10.81.0.1'));
      });
  
      afterEach(function() {
        stub.restore();
      });
      
      it('should return config for masterDatasource', async () => {
        let promise = Promise.resolve(config.for(MssqlConfig.masterDatasource()));
        expect(promise).to.eventually.have.property('datasource', MssqlConfig.masterDatasource());
        expect(stub).to.not.have.been.called;
      });
      
      it('should return config for pinewines', async () => {
        let promise = Promise.resolve(config.for('pinewines'));
        expect(promise).to.eventually.have.property('datasource', 'pinewines');
        expect(stub).to.have.been.called;
      });
    });
  });
});