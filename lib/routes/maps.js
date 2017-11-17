'use strict';

const bsns = require('../business/treasures');
const auth = require('../business/authenticate');
const Router = require('restify-router').Router;
const Constants = require('../utils/constants');

var r = new Router();

//Get neardy treasures for the user by coordinates
r.get(Constants.routes.mpath+'/:loc', auth.validateToken, bsns.getNearbyTreasures);

module.exports = r;
