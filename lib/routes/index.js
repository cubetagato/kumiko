'use strict';

const config = require('../configuration');
const morgan = require('morgan');
const log = require('../utils/logger');
const errors = require('restify-errors');
const rAuth = require('../business/authenticate');
//const rTrea = require('./treasures');
//const routerInstance = require('restify-router').Router();
const treasuresRouter = require('./treasures');

var router = function (srv) {

//Base path
const path = `${config.get('api:base')}/${config.get('api:version')}`;
//const tpath = path + '/tbox'

  //Basic route
  srv.get('/', function (req, res, next) {
    log.error(req.path() + ': 403 - Forbidden');
    next(new errors.ForbiddenError());
  });

  srv.get(path+'/', function(req, res, next) {
    log.info('attending at ' + req.path());
    res.send('I only need page 95. It is my destiny.');
  });

  //API routes
  //Authentication
  srv.post(path+'/authenticate', rAuth.createToken);
/*
  //Treasures
  //TODO: This function should be remove
  //srv.get(tpath+'/:user', rAuth.validateToken, rTrea.getUserTreasures);
  //Add new Treasure
  srv.put(tpath+'/:user', rAuth.validateToken, rTrea.addTreasure);
  //Delete a treasure
  srv.delete(tpath+'/:user/:tid', rAuth.validateToken, rTrea.deleteTreasure);
  //Get a treasure by Id
  srv.get(tpah+'/:user/:tid', rAuth.validateToken, rTrea.getTreasure);
  //Get all treasures for the user
  srv.get(tpath+'/:user', rAuth.validateToken, rTrea.getMyTreasures);
*/

  treasuresRouter.applyRoutes(srv);

};

module.exports = router;
