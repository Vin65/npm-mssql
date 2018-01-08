'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MssqlClient = require('./MssqlClient');
var MssqlQuery = require('./../lib/MssqlQuery');

var ProductionDbConfig = function () {
  function ProductionDbConfig(dbConfig) {
    _classCallCheck(this, ProductionDbConfig);

    this.dbConfig = dbConfig;

    this.configs = {};

    this._addConfigs([{
      dataSource: this.dbConfig.database,
      host: this.dbConfig.server
    }]);
  }

  _createClass(ProductionDbConfig, [{
    key: '_config',
    value: function _config(database, server) {
      var config = this.dbConfig.copy();
      config.database = database.toLowerCase();
      config.server = server;

      return config;
    }
  }, {
    key: '_addConfigs',
    value: function _addConfigs(datasources) {
      var _this = this;

      datasources.forEach(function (datasource) {
        _this.configs[datasource.dataSource.toLowerCase()] = _this._config(datasource.dataSource, datasource.host);
      });
    }
  }, {
    key: '_fetchDatasources',
    value: function _fetchDatasources() {
      var mssqlClient = new MssqlClient(this.dbConfig.toString());
      return mssqlClient.execute(MssqlQuery.select.datasource()).then(function (queryResults) {
        if (queryResults.recordsets[0].length) {
          return queryResults.recordsets[0];
        }
      }).catch(function (error) {
        console.error(error);
      });
    }
  }, {
    key: 'for_',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(database) {
        var config;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                config = this.configs[database.toLowerCase()];

                if (config) {
                  _context.next = 7;
                  break;
                }

                _context.t0 = this;
                _context.next = 5;
                return this._fetchDatasources();

              case 5:
                _context.t1 = _context.sent;

                _context.t0.addConfigs.call(_context.t0, _context.t1);

              case 7:
                return _context.abrupt('return', this.configs[database.toLowerCase()]);

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function for_(_x) {
        return _ref.apply(this, arguments);
      }

      return for_;
    }()
  }, {
    key: 'toString',
    value: function toString() {
      return this.dbConfig.toString();
    }
  }]);

  return ProductionDbConfig;
}();

module.exports = ProductionDbConfig;