# Installation
* `npm install --save npm-mssql`

* Ensure the following environment variables are added to your secrets:
  * `MSSQL_SERVER`
    - IP Address of `vin65master` database
  * `MSSQL_USERNAME`
    - Username for accessing all databases
  * `MSSQL_PASSWORD`
    - Password for username for accessing all databases
  
# Usage

### `MssqlClient`
* Add `const MssqlClient = require('npm-mssql/objects/MssqlClient');` to make `MssqlClient` constructor available to your code.

* To create a new `MssqlClient` instance, call `new MssqlClient(config)` where `config` is a required hash object that contains the following properties:
  * `datasource`
  * `server`
  * `username`
  * `password`

* The initially provided config can also be updated via called `.setConfig(config)` where `config` is a required hash object containing the properties listed above.

* To execute a query, call `.execute(query, params)`, where `query` is a required `string` that is a valid `SQL` statement, and `params` is optional hash object containing parameters for the `SQL` query.

### `MssqlConfig`
* Add `const MssqlConfig = require('npm-mssql/objects/MssqlConfig');` to make `MssqlConfig` constructor available to your code.

* To get an instance of `MssqlConfig`, call `MssqlConfig.singleton(environment)`, where `environment` is an optional `string`, which can be specified to be `production` to fetch `Production` Datasources information from `vin65master` datasource. Otherwise, `staging` datasource information will be returned using the provided `MSSQL_SERVER` environment variable.
  * **DO NOT** call `new MssqlConfig()` directly.
  * _If you need to destroy the singleton instance, call `MssqlConfig.resetSingleton()`._

* To fetch datasource config for a given datasource name, such as `pinewines`, call `singleton.for_(datasource)`, where `datasource` is a required `string` that is the name of datasource.

* The name of the master datasource is available via `.masterDatasource()` method. Currently, it's set to `vin65master`.

