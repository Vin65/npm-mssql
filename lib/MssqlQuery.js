'use strict';

var MssqlQuery = {
  select: {
    datasource: () => {
      return "SELECT dataSource, internalip AS host FROM datasources WITH(NOLOCK) WHERE isCurrentCodeBase = 1";
    }
  }
};

module.exports = MssqlQuery;