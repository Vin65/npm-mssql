'use strict';

var MssqlMockedResponse = {
  scaffolding: (data) => {
    let record = [];
    if (data) record.push(data);
    return {
      recordsets: [record]
    };
  },

  empty: function() {
    return this.scaffolding();
  },

  datasource: function(datasource, host) {
    return this.scaffolding({
      dataSource: datasource,
      host: host
    });
  },
};

module.exports = MssqlMockedResponse;
