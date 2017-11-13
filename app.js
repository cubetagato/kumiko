'use strict';

const config = require('./lib/configuration');
const log = require('./lib/utils/logger');
const app = require('./lib/utils/server');

(function main () {

  var server = app.createServer();

  server.listen(config.get('server:port'), config.get('server:host'), function () {
    log.info('Listening at ' + server.url);
  });
})();
