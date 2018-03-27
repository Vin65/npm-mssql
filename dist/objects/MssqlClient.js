'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mssql = require('mssql');

var MssqlClient = function () {
  function MssqlClient(dbConfig) {
    _classCallCheck(this, MssqlClient);

    this.dbConfig = dbConfig;
  }

  _createClass(MssqlClient, [{
    key: 'execute',
    value: function execute(query, params) {
      console.log('Create MSSQL Connection Pool');
      return new mssql.ConnectionPool(this.dbConfig.toString()).connect().then(function (pool) {
        console.log('Grab MSSQL pool request.');
        pool = pool.request();
        for (var key in params) {
          pool = pool.input(key, params[key]);
        }
        console.log('Run query on MSSQL Pool.');
        pool = pool.query(query);
        return pool;
      }).then(function (queryResults) {
        console.log('MSSQL Success, close connection pool.');
        mssql.close();
        return queryResults;
      }).catch(function (error) {
        console.log('MSSQL Fail, close connection pool.');
        mssql.close();
        throw error;
      }).finally(function () {
        console.log('MSSQL finally close connection pool.');
        mssql.close();
      });
    }
  }]);

  return MssqlClient;
}();

module.exports = MssqlClient;