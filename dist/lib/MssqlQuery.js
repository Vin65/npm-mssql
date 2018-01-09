'use strict';

var MssqlQuery = {
  select: {
    datasource: function datasource() {
      return "SELECT dataSource, internalip AS host FROM datasources WITH(NOLOCK) WHERE isCurrentCodeBase = 1";
    }
  }
};

module.exports = MssqlQuery;