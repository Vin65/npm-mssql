'use strict';

import DbConfig from './../../../objects/DbConfig';
import MssqlClient from './../../../objects/MssqlClient';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));

describe('MssqlClient', () => {
  let dbConfig = DbConfig.build('datasource', '10.81.0.1', 'Us3r', 'P4ssw0rd!');
  let subject = new MssqlClient(dbConfig);
  
  describe('#execute', () => {
    
  });
});