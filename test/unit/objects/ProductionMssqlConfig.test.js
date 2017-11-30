'use strict';

import MssqlClient from './../../../objects/MssqlClient';
import ProductionMssqlConfig from './../../../objects/ProductionMssqlConfig';

import MssqlMockedResponse from './../../support/MssqlMockedResponse';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

chai.use(require("chai-as-promised"));
chai.use(require("sinon-chai"));

describe('ProductionMssqlConfig', () => {
  describe('#addDatasource', () => {
    let config = new ProductionMssqlConfig();
    
    before(function() {
      config.addDatasource('datasource', '10.81.0.1', 'Us3r', 'P4ssw0rd!');
    });
    
    it("should add datasource", () => {
      expect(Object.keys(config.datasources).length).to.equal(2);
    });
  });
  
  
  describe('#for', () => {
    context("when environment is specified as 'production'", () => {
      let config = new ProductionMssqlConfig();
      let stub;
      
      beforeEach(function() {
        stub = sinon.stub(MssqlClient.prototype, 'execute');
        stub.resolves(MssqlMockedResponse.datasource('pinewines', '10.81.0.1'));
      });
  
      afterEach(function() {
        stub.restore();
      });
      
      it('should return config for masterDatasource', async () => {
        let promise = Promise.resolve(config.for(ProductionMssqlConfig.masterDatasource()));
        expect(promise).to.eventually.have.property('datasource', ProductionMssqlConfig.masterDatasource());
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