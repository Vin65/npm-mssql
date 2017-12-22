'use strict';

import DbConfig from './../../../objects/DbConfig';
import MssqlClient from './../../../objects/MssqlClient';
import MssqlQuery from './../../../lib/MssqlQuery';
import ProductionDbConfig from './../../../objects/ProductionDbConfig';

import MssqlMockedResponse from './../../support/MssqlMockedResponse';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

chai.use(require('chai-as-promised'));
chai.use(require('chai-change'));
chai.use(require('sinon-chai'));

describe('ProductionDbConfig', () => {
  let dbConfig = DbConfig.build('datasource', '10.81.0.1', 'Us3r', 'P4ssw0rd!');
  
  describe('#new', () => {
    let subject = new ProductionDbConfig(dbConfig);
    
    it('should create config with same properties as original config', () => {
      expect(subject.configs[dbConfig.database]).to.deep.equal(dbConfig);
    });
    
    it('should create new config object that is different from original config object', () => {
      expect(subject.configs[dbConfig.database]).to.not.equal(dbConfig);
    });
  });
  
  describe('#_addConfigs', () => {
    let subject = new ProductionDbConfig(dbConfig);
    
    it('should add config', () => {
      expect(() => { 
        subject._addConfigs([{
          dataSource: 'localhost',
          host: '127.0.0.1'
        }])
      }).to.alter(() => Object.keys(subject.configs).length, { by: 1 });
    });
  });
  
  describe('#_fetchDatasources', () => {
    let subject = new ProductionDbConfig(dbConfig);
    let stub;
    
    before(function() {
      stub = sinon.stub(MssqlClient.prototype, 'execute');
      stub.resolves(MssqlMockedResponse.datasource('pinewines', '10.81.0.2'));
    });

    after(function() {
      stub.restore();
    });
    
    it('should fetch datasources', () => {
      let promise = Promise.resolve(subject._fetchDatasources());
      expect(promise).to.eventually.be.an.instanceOf(Array).that.has.lengthOf(1);
      expect(stub).to.have.been.calledWith(MssqlQuery.select.datasource());
    });
  });
  
  describe('#for_', () => {
    let subject = new ProductionDbConfig(dbConfig);
    let stub;
    
    before(function() {
      stub = sinon.stub(MssqlClient.prototype, 'execute');
      stub.resolves(MssqlMockedResponse.datasource('pinewines', '10.81.0.2'));
    });

    after(function() {
      stub.restore();
    });
    
    it('should return config for an already present datasource', async () => {
      let promise = Promise.resolve(subject.for_(dbConfig.database));
      expect(promise).to.eventually.have.property('database', dbConfig.database);
      expect(stub).to.not.have.been.called;
    });
    
    it('should fetch and return config for a new datasource', async () => {
      let promise = Promise.resolve(subject.for_('pinewines'));
      expect(promise).to.eventually.have.property('database', 'pinewines');
      expect(stub).to.have.been.called;
    });
  });
});