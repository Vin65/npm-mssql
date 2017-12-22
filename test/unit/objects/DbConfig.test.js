'use strict';

import DbConfig from './../../../objects/DbConfig';

const chai = require('chai');
const expect = chai.expect;

describe('DbConfig', () => {
  describe('.build', () => {
    let subject = DbConfig.build('datasource', '10.81.0.1', 'Us3r', 'P4ssw0rd!');
      
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
});