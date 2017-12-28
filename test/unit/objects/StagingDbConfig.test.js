'use strict';

import DbConfig from './../../../objects/DbConfig';
import StagingDbConfig from './../../../objects/StagingDbConfig';

const chai = require('chai');
const expect = chai.expect;

chai.use(require('chai-change'));

describe('StagingDbConfig', () => {
  let dbConfig = new DbConfig('datasource', '10.81.0.1', 'Us3r', 'P4ssw0rd!');
  let config = new StagingDbConfig(dbConfig);
   
  describe('#for_', () => {
    context('any-database', () => {
      let subject;
      
      beforeEach(async () => {
        subject = await config.for_('any-database');
      })
      
      it('should have database property', () => {
        expect(subject).to.have.property('database', 'any-database');
      });
      
      it('should have server property', () => {
        expect(subject).to.have.property('server', '10.81.0.1');
      });
      
      it('should have user property', () => {
        expect(subject).to.have.property('user', 'Us3r');
      });
      
      it('should have password property', () => {
        expect(subject).to.have.property('password', 'P4ssw0rd!');
      });
    });
  });
});