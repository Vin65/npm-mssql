'use strict';

import DbConfig from './../../../src/objects/DbConfig';
import StagingDbConfig from './../../../src/objects/StagingDbConfig';

const chai = require('chai');
const expect = chai.expect;

chai.use(require('chai-change'));

describe('StagingDbConfig', async function () {
  let dbConfig = new DbConfig('datasource', '10.81.0.1', 'Us3r', 'P4ssw0rd!');
  let config = new StagingDbConfig(dbConfig);

  describe('#for_', async function () {
    context('any-database', async function () {
      let subject;

      beforeEach(async function () {
        subject = await config.for_('any-database');
      });

      it('should have database property', function () {
        expect(subject).to.have.property('database', 'any-database');
      });

      it('should have server property', function () {
        expect(subject).to.have.property('server', '10.81.0.1');
      });

      it('should have user property', function () {
        expect(subject).to.have.property('user', 'Us3r');
      });

      it('should have password property', function () {
        expect(subject).to.have.property('password', 'P4ssw0rd!');
      });
    });
  });
});