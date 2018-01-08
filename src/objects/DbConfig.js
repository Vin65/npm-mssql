'use strict';

class DbConfig {
  constructor(database, server, user, password) {
    this.database = database;
    this.server = server;
    this.user = user;
    this.password = password;
  }
  
  toString() {
    return {
      database: this.database,
      server:   this.server,
      user:     this.user,
      password: this.password
    };
  }
  
  copy() {
    return Object.assign(Object.create(this), this);
  }
}

module.exports = DbConfig;