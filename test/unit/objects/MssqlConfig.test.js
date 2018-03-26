'use strict';

import MssqlClient from './../../../src/objects/MssqlClient';
import MssqlConfig from './../../../src/objects/MssqlConfig';
import StagingDbConfig from './../../../src/objects/StagingDbConfig';
import ProductionDbConfig from './../../../src/objects/ProductionDbConfig';
import MssqlMockedResponse from './../../support/MssqlMockedResponse';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));

describe('MssqlConfig', async function () {
  describe('.masterDatasource', function () {
    it("should be 'vin65master'", function () {
      expect(MssqlConfig.masterDatasource()).to.equal('vin65master');
    });
  });

  describe('.singleton', async function () {
    let stub;

    before(function () {
      stub = sinon.stub(MssqlClient.prototype, 'execute');
      stub.resolves(MssqlMockedResponse.datasource('pinewines', '10.81.0.2'));
    });

    after(function () {
      stub.restore();
    });

    context('when environment is specified as null', function () {
      let singleton;

      before(function () {
        singleton = MssqlConfig.singleton(null, 'datasource', '127.0.0.1', 'Us3r', 'P4ssw0rd!');
      });

      after(function () {
        MssqlConfig.resetSingleton();
      });

      it('should return an instance of StagingDbConfig', function () {
        expect(MssqlConfig.singleton()).to.be.an.instanceof(StagingDbConfig);
      });

      it('should return same object', function () {
        expect(MssqlConfig.singleton()).to.equal(singleton);
      });

      describe('#for_', function () {
        it("should return config for 'datasource'", async function () {
          let results = await MssqlConfig.singleton().for_('datasource');

          expect(results).to.have.property('database', 'datasource');
          expect(stub).to.not.have.been.called;
        });

        it("should return config for 'any-database'", async function () {
          let results = await MssqlConfig.singleton().for_('any-database');

          expect(results).to.have.property('database', 'any-database');
          expect(stub).to.not.have.been.called;
        });
      });
    });

    context("when environment is specified as 'production'", async function () {
      let singleton;

      before(function () {
        singleton = MssqlConfig.singleton('production', 'datasource', '127.0.0.1', 'Us3r', 'P4ssw0rd!');
      });

      after(function () {
        MssqlConfig.resetSingleton();
      });

      it('should return an instance of ProductionDbConfig', function () {
        expect(MssqlConfig.singleton()).to.be.an.instanceof(ProductionDbConfig);
      });

      it('should return same object', function () {
        expect(MssqlConfig.singleton()).to.equal(singleton);
      });

      describe('#for_', function () {
        it("should return config for 'datasource'", async function () {
          let results = await MssqlConfig.singleton().for_('datasource');
          expect(results).to.have.property('database', 'datasource');
          expect(stub).to.not.have.been.called;
        });

        it("should return config for 'pinewines'", async function () {
          let results = await MssqlConfig.singleton().for_('pinewines');

          expect(results).to.have.property('database', 'pinewines');
          expect(stub).to.have.been.called;
        });
      });
    });
  });
});