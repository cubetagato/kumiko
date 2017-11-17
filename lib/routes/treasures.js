'use strict';

const bsns = require('../business/treasures');
const auth = require('../business/authenticate');
const Router = require('restify-router').Router;
const Constants = require('../utils/constants');

var r = new Router();

//Treasures
//Add new Treasure
r.post(Constants.routes.tpath+'/', auth.validateToken, bsns.addTreasure);
//Delete a treasure by Id
r.del(Constants.routes.tpath+'/:tid', auth.validateToken, bsns.deleteTreasureById);
//Get a treasure by Id
r.get(Constants.routes.tpath+'/:tid', auth.validateToken, bsns.getTreasureById);
//Get all treasures for the user
r.get(Constants.routes.tpath+'/', auth.validateToken, bsns.listMyTreasures);
//Get neardy treasures for the user
//r.get(Constants.routes.upath+'/:loc',  bsns.getNearbyTreasures);

module.exports = r;
