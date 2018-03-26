'use strict';

import DbConfig from './../../../src/objects/DbConfig';
import MssqlClient from './../../../src/objects/MssqlClient';
import MssqlQuery from './../../../src/lib/MssqlQuery';
import ProductionDbConfig from './../../../src/objects/ProductionDbConfig';
import MssqlMockedResponse from './../../support/MssqlMockedResponse';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

chai.use(require('chai-as-promised'));
chai.use(require('chai-change'));
chai.use(require('sinon-chai'));

describe('ProductionDbConfig', async function () {
  let dbConfig = new DbConfig('datasource', '10.81.0.1', 'Us3r', 'P4ssw0rd!');

  describe('#new', function () {
    let subject = new ProductionDbConfig(dbConfig);

    it('should create config with same properties as original config', function () {
      expect(subject.configs[dbConfig.database]).to.deep.equal(dbConfig);
    });

    it('should create new config object that is different from original config object', function () {
      expect(subject.configs[dbConfig.database]).to.not.equal(dbConfig);
    });
  });

  describe('#_addConfigs', function () {
    let subject = new ProductionDbConfig(dbConfig);

    it('should add config', function () {
      expect(function () {
        subject._addConfigs([{
          dataSource: 'localhost',
          host: '127.0.0.1'
        }]);
      }).to.alter(() => Object.keys(subject.configs).length, {
        by: 1
      });
    });
  });

  describe('#_fetchDatasources', function () {
    let subject = new ProductionDbConfig(dbConfig);
    let stub;

    before(function () {
      stub = sinon.stub(MssqlClient.prototype, 'execute');
      stub.resolves(MssqlMockedResponse.datasource('pinewines', '10.81.0.2'));
    });

    after(function () {
      stub.restore();
    });

    it('should fetch datasources', function () {
      let promise = Promise.resolve(subject._fetchDatasources());
      expect(promise).to.eventually.be.an.instanceOf(Array).that.has.lengthOf(1);
      expect(stub).to.have.been.calledWith(MssqlQuery.select.datasource());
    });
  });

  describe('#for_', async function () {
    let subject = new ProductionDbConfig(dbConfig);
    let stub;

    before(function () {
      stub = sinon.stub(MssqlClient.prototype, 'execute');
      stub.resolves(MssqlMockedResponse.datasource('pinewines', '10.81.0.2'));
    });

    after(function () {
      stub.restore();
    });

    it('should return config for an already present datasource', async function () {
      let results = await subject.for_(dbConfig.database);

      expect(results).to.have.property('database', dbConfig.database);
      expect(stub).to.not.have.been.called;
    });

    it('should fetch and return config for a new datasource', async function () {
      let results = await subject.for_('pinewines');

      expect(results).to.have.property('database', 'pinewines');
      expect(stub).to.have.been.called;
    });
  });
});