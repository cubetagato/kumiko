'use strict';

const log = require('../utils/logger');
const error = require('restify-errors');
const jwt = require('jsonwebtoken');
const config = require('../configuration');

function createToken(req, res, next)  {
  log.info('Creating token');
  var token = jwt.sign({admin: true}, 'parangarikutirimikuaro', {expiresIn: 60*5});
  log.info('token created -> ', token);
  res.json({
    code: 200,
    message: 'entrale al token',
    token: token
  });
};

function validateToken(req, res, next)  {
  log.info('Validating token');

  //Token should travel by request header
  var token = req.headers['x-access-token'];

  if (token)  {
    log.info('Token exist: ' + token);
    jwt.verify(token, config.get('security:secret'), function (err, decoded)  {
      if(err) {
        log.error('Invalid token');
        next(new error.ForbiddenError({
          statusCode: 403,
          message: 'Failed to authenticate token.'
        }));
      } else {
        log.info('Valid token');
        req.decoded = decoded;
        next();
      }
    });
  } else {
    log.info('No token provided');
    next(new error.ForbiddenError({
      statusCode: 403,
      message: 'No token provided.'
    }));
  }
};

module.exports = {
  createToken: createToken,
  validateToken: validateToken
};
