'use strict';

const bsns = require('../business/treasures');
const auth = require('../business/authenticate');
const Router = require('restify-router').Router;
const Constants = require('../utils/constants');

var r = new Router();

//Treasures
//TODO: This function should be remove
//srv.get(tpath+'/:user', rAuth.validateToken, rTrea.getUserTreasures);
//Add new Treasure
r.put(Constants.routes.tpath+'/:user', bsns.addTreasure);
//Delete a treasure
r.del(Constants.routes.tpath+'/:user/:tid', auth.validateToken, bsns.deleteTreasure);
//Get a treasure by Id
r.get(Constants.routes.tpah+'/:user/:tid', auth.validateToken, bsns.getTreasure);
//Get all treasures for the user
r.get(Constants.routes.tpath+'/:user', auth.validateToken, bsns.getMyTreasures);

module.exports = r;
