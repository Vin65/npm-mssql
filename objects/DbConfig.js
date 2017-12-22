'use strict';

class DbConfig {  
  static build(database, server, username, passsword) {
    return {
      database: database,
      server:   server,
      user:     username,
      password: passsword
    };
  }
}

module.exports = DbConfig;