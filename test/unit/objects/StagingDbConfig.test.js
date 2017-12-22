'use strict';

import DbConfig from './../../../objects/DbConfig';
import StagingDbConfig from './../../../objects/StagingDbConfig';

const chai = require('chai');
const expect = chai.expect;

chai.use(require('chai-change'));

describe('StagingDbConfig', () => {
  let dbConfig = DbConfig.build('datasource', '10.81.0.1', 'Us3r', 'P4ssw0rd!');
  let config = new StagingDbConfig(dbConfig);
   
  describe('#for_', () => {
    context('any-database', () => {
      let subject;
      
      beforeEach(async () => {
        subject = await config.for_('any-database');
      })
      
      it('should have database property', async () => {
        expect(subject).to.have.property('database', 'any-database');
      });
      
      it('should have server property', async () => {
        expect(subject).to.have.property('server', '10.81.0.1');
      });
      
      it('should have user property', async () => {
        expect(subject).to.have.property('user', 'Us3r');
      });
      
      it('should have password property', async () => {
        expect(subject).to.have.property('password', 'P4ssw0rd!');
      });
      
      context("when comparing to response for 'something-else'", () => {
        let subject2;
      
        beforeEach(async () => {
          subject2 = await config.for_('something-else');
        })
        
        it('should not equal second subject', async () => {
          expect(subject).to.not.equal(subject2);
        });
        
        it('should not traverse changes from first subject to second subject', async () => {
          expect(() => { subject.database = 'testing' }).to.not.alter(() => subject2.database, { from: 'something-else', to: 'testing' });
        });
        
        it('should not traverse changes from second subject to first subject', async () => {
          expect(() => { subject2.server = '127.0.0.1' }).to.not.alter(() => subject.server, { from: '10.81.0.1', to: '127.0.0.1' });
        });
      });
    });
  });
});