'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DbConfig = require('./DbConfig');
var DbConfigFactory = require('./DbConfigFactory');

var _singleton = void 0;

var MssqlConfig = function () {
  function MssqlConfig() {
    _classCallCheck(this, MssqlConfig);
  }

  _createClass(MssqlConfig, null, [{
    key: 'masterDatasource',
    value: function masterDatasource() {
      return 'vin65master';
    }
  }, {
    key: 'singleton',
    value: function singleton(environment) {
      if (!_singleton) {
        var dbConfig = new DbConfig(arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2], arguments.length <= 3 ? undefined : arguments[3], arguments.length <= 4 ? undefined : arguments[4]);
        _singleton = DbConfigFactory.build(environment, dbConfig);
      }

      return _singleton;
    }
  }, {
    key: 'resetSingleton',
    value: function resetSingleton() {
      _singleton = null;
    }
  }]);

  return MssqlConfig;
}();

module.exports = MssqlConfig;