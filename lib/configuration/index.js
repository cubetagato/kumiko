'use strict';

const nconf = require('nconf');

function Config ()  {

  var environment = nconf.get('NODE_ENV') || 'development';

  nconf
    .argv()
    .env()
    .file(environment, './config/' + environment.toLowerCase() + '.json')
    .file('default', './config/default.json');
}

Config.prototype.get = function (key) {
  return nconf.get(key);
};

module.exports = new Config ();
