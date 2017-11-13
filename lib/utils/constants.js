'use strict';

const config = require('../configuration');

var Constants = {
  routes: {
    path: `${config.get('api:base')}/${config.get('api:version')}`,
    tpath: `${config.get('api:base')}/${config.get('api:version')}/tbox`
  }
};

module.exports = Constants;
