'use strict';

const bsns = require('../business/users');
const auth = require('../business/authenticate');
const Router = require('restify-router').Router;
const Constants = require('../utils/constants');

var r = new Router();

//API Create user
r.post(Constants.routes.upath+'/', bsns.addUser);
//Delete user
r.del(Constants.routes.upath+'/', auth.validateToken, bsns.deleteUser);
//Get user Info
r.get(Constants.routes.upath+'/', auth.validateToken, bsns.getUserInfo);

module.exports = r;
