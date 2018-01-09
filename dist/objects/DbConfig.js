'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DbConfig = function () {
  function DbConfig(database, server, user, password) {
    _classCallCheck(this, DbConfig);

    this.database = database;
    this.server = server;
    this.user = user;
    this.password = password;
  }

  _createClass(DbConfig, [{
    key: 'toString',
    value: function toString() {
      return {
        database: this.database,
        server: this.server,
        user: this.user,
        password: this.password
      };
    }
  }, {
    key: 'copy',
    value: function copy() {
      return Object.assign(Object.create(this), this);
    }
  }]);

  return DbConfig;
}();

module.exports = DbConfig;