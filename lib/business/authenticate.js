'use strict';

const log = require('../utils/logger');
const error = require('restify-errors');
const jwt = require('jsonwebtoken');
const config = require('../configuration');
const mongoose = require('mongoose');
const UserModel = mongoose.model('User');
const bcrypt = require('bcrypt');

function createToken(req, res, next)  {

  log.info(req.path());
  log.info('Creating token');
  log.debug('createToken()');
  log.debug('req.body:');
  log.debug(req.body);
  log.debug('req.params:');
  log.debug(req.params);

  if(req.params.user && req.params.pass)  {

    var user = req.params.user;
    log.debug('user: '+user);
    var pass = req.params.pass;
    log.debug('pass: '+pass);

    UserModel.findById(user, function (err, doc) {
      if(err) {
        log.error('Error finding user ' + user);
        log.error(err);
        return (next(new error.InternalServerError(err)));
      } else if (doc) {
        try {
          log.debug('USER: ' + doc);
          var saltRounds = config.get('security:sal_rounds');
          log.debug('salt_rounds: ' +  saltRounds);

          var saltedPass = doc.salt1 + '.' + pass + '.' + doc.salt2;
          log.debug('saltedPass: ' + saltedPass);

          bcrypt.compare(saltedPass, doc.pass, function (err, isMatch)  {
            if(err) {
              log.error('Invalid Password');
              return (next(new error.UnauthorizedError('Invalid Password')));
            } else if (isMatch) {
              log.info('PASS OK');
              var token = jwt.sign({admin: true}, config.get('security:secret'), {expiresIn: config.get('security:jwt_expire_time')});

              log.info('token created -> ', token);

              res.status(200);
              res.send({
                token: token,
                sidate: Date.now()
              });
            } else {
              log.error('Invalid Password');
              return (next(new error.ForbiddenError('Invalid Password')));
            }
          });

        } catch (e) {
          log.error('Error Authenticating user');
          log.error(e);
          return (next(new error.UnauthorizedError('Invalid Password')));
        }
      }
    })

  } else {
    log.error('Authentication Bad Request');
    return (next(new error.BadRequestError('Authentication Bad Request')));
  }


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
          message: 'Invalid token.'
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

//TODO: Destroy token

module.exports = {
  createToken: createToken,
  validateToken: validateToken
};
