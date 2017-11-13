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
  log.info('Adding new treasure');
  log.info(req.body);

  var user = req.params.user;
  log.info('User:' + user);

  if(user)  {



  } else {
    next(new error.BadRequest(
      'No user provided'
    ));
  }


}

//logical delete of a treasure
function deleteTreasure(req, res, next) {

}

//Get a treasure by Id
function getTreasure(res, req, next)  {

}

//Get all treasures by user owner
function getMyTreasures(res, req, next) {

}

module.exports = {
//TODO: delete this function when the other get ready
  getTreasureAtPoint: getTreasureAtPoint,
//TODO: Update for get the objetive user treasures.
  getUserTreasures: getUserTreasures,
  addTreasure: addTreasure,
  deleteTreasure: deleteTreasure,
  getTreasure: getTreasure,
  getMyTreasures: getMyTreasures
};
