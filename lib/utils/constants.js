'use strict';

const config = require('../configuration');

//API Root
var path = `${config.get('api:base')}/${config.get('api:version')}`;
//API User
var upath = `${path}/:user`;
//API User Treasurebox
var tpath = `${upath}/tbox`;
//API User map
var mpath = `${upath}/map`;


var Constants = {
  routes: {
    path: path,
    upath: upath,
    tpath: tpath,
    mpath: mpath
  }
};

module.exports = Constants;
