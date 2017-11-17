'use strict';

const log = require('../utils/logger');
const error = require('restify-errors');
const jwt = require('jsonwebtoken');
const config = require('../configuration');
const mongoose = require('mongoose');
const TreasureModel = mongoose.model('Treasure');

function getTreasureAtPoint(req, res, next) {

  log.info('getting treasure at point');
};

function getUserTreasures(req, res, next) {
  log.info('Getting user treasures');
  res.status(200);
  return res.send({
    treasures: {
      17283940: {
        lat: 12.03,
        lon: -9.12,
        message: 'hello world...!'
      }
    }
  });
}

//Add new treasure
function addTreasure (req, res, next) {

  log.info(req.path());
  log.info('Adding new treasure');
  log.debug('addTreasure()');
  log.debug('req.body:');
  log.debug(req.body);
  log.debug('req.params:');
  log.debug(req.params);

  var user = req.params.user;
  log.info('User:' + user);

  if(user && req.body.location && req.body.viewers)  {

    var newTreasure = new TreasureModel(req.body);
    log.debug( newTreasure );

    newTreasure.owner_id = user;
    newTreasure.creation_date = new Date ();
    console.log( newTreasure );

    newTreasure.save(function(err, doc) {
      if (doc)  {
        log.info('Document ' + doc._id + ' created');
        res.status(200);
        res.send(doc);
      } else if (err) {
        log.error('Error saving treasure ' + newTreasure);
        log.error(err);
        return next(new error.InternalServerError(err));
      } else {
        log.error('algo mas');
      }

    });

  } else {
    next(new error.BadRequest(
      'No required info provided'
    ));
  }


};

//logical delete of a treasure
function deleteTreasureById(req, res, next) {
  log.info(req.path());
  log.info('Deleting treasure');
  log.debug('deleteTreasureById()');
  log.debug('req.body:');
  log.debug(req.body);
  log.debug('req.params:');
  log.debug(req.params);

  if (req.params.user && req.params.tid)  {

    var owner_id = req.params.user;
    log.debug('owner_id = ' + owner_id);
    var t_id = req.params.tid;
    log.debug('_id = ' + t_id);

    var treasure = new TreasureModel(req.body);
    log.debug(treasure);

    TreasureModel.find({
      _id: t_id
    }).remove(function(err, treasures)  {
      if(err) {
        log.error('Error deleting treasure' + treasure);
        log.error(err);
        return next(new errors.InternalServerError(err));
      } else if(treasures)  {
        log.debug(treasure + 'already deleted');
        res.status(200);
        return res.send();
      } else {
        log.error('algo pasó');
      }
    });

  } else {
    next(new error.BadRequest(
      'No required info provided'
    ));
  }
}

//Get a treasure by Id
function getTreasureById(req, res, next)  {
  log.info(req.path());
  log.info('Getting treasure by Id');
  log.debug('getTreasureById()');
  log.debug('req.body:');
  log.debug(req.body);
  log.debug('req.params:');
  log.debug(req.params);

  if (req.params.user && req.params.tid)  {

    var owner_id = req.params.user;
    log.debug('owner_id = ' + owner_id);
    var t_id = req.params.tid;
    log.debug('_id = ' + t_id);

    TreasureModel.find({
      'owner_id': owner_id,
      '_id': t_id
    }).exec(function(err, treasures)  {
      if(err) {
        log.error('Error getting treasures for owner ' + owner_id);
        log.error(err);
        return next(new errors.InternalServerError(err));
      } else if(treasures)  {
        log.debug('treasures: ' + treasures);
        res.status(200);
        return res.send(treasures);
      } else {
        log.error('algo pasó');
      }
    });

  } else {
    next(new error.BadRequest(
      'No required info provided'
    ));
  }
};

//Get all treasures by user owner
function listMyTreasures(req, res, next) {

  log.info(req.path());
  log.info('Adding new treasure');
  log.debug('addTreasure()');
  log.debug('req.body:');
  log.debug(req.body);
  log.debug('req.params:');
  log.debug(req.params);

  if (req.params.user)  {

    var owner_id = req.params.user;
    log.debug('owner_id = ' + owner_id);

    TreasureModel.find({
      'owner_id': owner_id
    }).sort({
      creation_date: -1
    }).exec(function(err, treasures)  {
      if(err) {
        log.error('Error getting treasures for owner ' + owner_id);
        log.error(err);
        return next(new errors.InternalServerError(err));
      } else if(treasures)  {
        log.debug('treasures: ' + treasures);
        res.status(200);
        return res.send(treasures);
      } else {
        log.error('algo pasó');
      }
    });

  } else {
    next(new error.BadRequest(
      'No required info provided'
    ));
  }

};

function getNearbyTreasures(req, res, next) {

  log.info(req.path());
  log.info('Adding new treasure');
  log.debug('addTreasure()');
  log.debug('req.body:');
  log.debug(req.body);
  log.debug('req.params:');
  log.debug(req.params);

  if (req.params.loc)  {

    var viewer = req.params.user;
    log.debug('viewer: ' + viewer);
    var location = req.params.loc.split(",");
    log.debug('location: ' + location);

    TreasureModel.find({viewers: viewer})
      .where('location')
      .within({
        center: location,
        radius: 10/6378.1,
        spherical: true
      }).exec(function (err, treasures) {
        if (err)  {
          log.error('Error getting neardy treasures for viewer ' + viewer);
          log.error(err);
          return next (new error.InternalServerError(err));
        } else if(treasures)  {
          log.debug('Nearby treasures: ' + treasures);
          res.status(200);
          return res.send(treasures);
        } else {
          return next (new error.InternalServerError("Unknow Error"));
        }
      })

  } else {
    next(new error.BadRequest(
      'No required info provided'
    ));
  }

};

module.exports = {
  addTreasure: addTreasure,
  deleteTreasureById: deleteTreasureById,
  getTreasureById: getTreasureById,
  listMyTreasures: listMyTreasures,
  getNearbyTreasures:getNearbyTreasures
};
