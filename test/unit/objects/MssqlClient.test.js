'use strict';

import DbConfig from './../../../src/objects/DbConfig';
import MssqlClient from './../../../src/objects/MssqlClient';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));

describe('MssqlClient', () => {
  let dbConfig = new DbConfig('datasource', '10.81.0.1', 'Us3r', 'P4ssw0rd!');
  let subject = new MssqlClient(dbConfig);

  describe('#execute', () => {

  });
});