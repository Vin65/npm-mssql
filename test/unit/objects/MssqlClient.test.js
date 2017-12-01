'use strict';

import MssqlClient from './../../../objects/MssqlClient';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

chai.use(require("chai-as-promised"));
chai.use(require("sinon-chai"));

describe('MssqlClient', () => {
  let client = new MssqlClient({
    datasource: 'datasource',
    server:     '10.81.0.1',
    username:   'Us3r',
    password:   'P4ssw0rd!'
  });
  
  describe('constructor', () => {
    it("should have 'datasource' as property", () => {
      expect(client).to.have.property('datasource', 'datasource');
    });
    
    it("should have 'server' as property", () => {
      expect(client).to.have.property('server', '10.81.0.1');
    });
    
    it("should have 'username' as property", () => {
      expect(client).to.have.property('username', 'Us3r');
    });
    
    it("should have 'password' as property", () => {
      expect(client).to.have.property('password', 'P4ssw0rd!');
    });
  });
  
  describe('_config', () => {
    it("should have 'database' as property", () => {
      expect(client._config()).to.have.property('database', 'datasource');
    });
    
    it("should have 'server' as property", () => {
      expect(client._config()).to.have.property('server', '10.81.0.1');
    });
    
    it("should have 'user' as property", () => {
      expect(client._config()).to.have.property('user', 'Us3r');
    });
    
    it("should have 'password' as property", () => {
      expect(client._config()).to.have.property('password', 'P4ssw0rd!');
    });
  });
});