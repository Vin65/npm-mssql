'use strict';

import DbConfig from './../../../src/objects/DbConfig';

const chai = require('chai');
const expect = chai.expect;

chai.use(require('chai-change'));

describe('DbConfig', () => {
  let dbConfig = new DbConfig('datasource', '10.81.0.1', 'Us3r', 'P4ssw0rd!');

  describe('#toString', () => {
    let subject = dbConfig.toString();

    it('should have database property', () => {
      expect(subject).to.have.property('database', 'datasource');
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

  describe('#copy', () => {
    let subject = dbConfig;
    let clone = subject.copy();

    it('should not equal clone', () => {
      expect(subject).to.not.equal(clone);
    });

    it('should not traverse changes from subject to clone', () => {
      expect(() => { subject.database = 'testing'; }).to.not.alter(() => clone.database, { from: 'datasource', to: 'testing' });
    });

    it('should not traverse changes from clone to subject', async () => {
      expect(() => { clone.server = '127.0.0.1'; }).to.not.alter(() => subject.server, { from: '10.81.0.1', to: '127.0.0.1' });
    });

  });
});