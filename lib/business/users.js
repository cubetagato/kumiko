
'use strict';

const log = require('../utils/logger');
const mongoose = require('mongoose');
const errors = require('restify-errors');
const UserModel = mongoose.model('User');
const bcrypt = require('bcrypt');
const config = require('../configuration');
const crypto = require('crypto');

function addUser(req, res, next)  {
  log.info(req.path());
  log.info('Adding new user');
  log.debug('addUser()');
  log.debug('req.body:');
  log.debug(req.body);
  log.debug('req.params:');
  log.debug(req.params);

  if(req.params.user && req.body.pass && req.body.mail && req.body.username && req.body.fname && req.body.lname )  {

    var id = req.params.user;
    log.debug('user: ' + id);
    var pass = req.body.pass;
    log.debug('pass: ' + pass);
    var mail = req.body.mail;
    log.debug('mail: ' + mail);
    var username = req.body.username;
    log.debug('username: ' + username);
    var fname = req.body.fname;
    log.debug('fname: ' + fname);
    var lname = req.body.lname;
    log.debug('lname: ' + lname);

    var salt1 = Date.now();
    log.debug('salt1: ' + salt1);
    var salt2 = crypto.randomBytes(64).toString('hex');
    log.debug('salt2: ' + salt2);

    var saltedPass = salt1 + '.' + pass + '.' + salt2;
    log.debug('Salted pass: ' + saltedPass);

    var saltRounds = config.get('security:sal_rounds');
    log.info('salt_rounds: ' +  saltRounds);

    bcrypt.hash(saltedPass, saltRounds, function(err, hash) {

      if(err) {

        log.error('Error hashing password');
        log.error(err);
        return (next(new errors.InternalServerError(err)));
      } else if(hash) {

        log.debug('Hash: ' + hash);
        var newUser = new UserModel({
          _id: id,
          pass: hash,
          mail: mail,
          username: username,
          fname: fname,
          lname: lname,
          supdate: new Date (),
          bloqList: [],
          bloquedAccount: false,
          validatedMail: true,
          salt1: salt1,
          salt2: salt2
        });
        log.debug('USER: ' + newUser);

        newUser.save(function (err, doc)  {
          if (err)  {
            log.error('Create user Internal Server Error: ');
            log.error(err);
            next(new errors.InternalServerError(err));
          } else if (doc) {
            log.info('User ' + doc._id + ' created' );
            res.status(201);
            return res.send('Created');
          } else {
            res.error('Create user Unknow error');
            return (next(new errors.InternalServerError('Unknow Error')));
          }
        });

      } else {
        res.error('Create user Unknow error');
        return (next(new errors.InternalServerError('Unknow Error')));
      }
    });

  } else {
    log.error('Create user bad request');
    return next( new errors.BadRequestError('Create user bad request'));
  }

};

function deleteUser(req, res, next)  {
  log.info(req.path());
  log.info('Deleting User');
  log.debug('deleteUser()');
  log.debug('req.body:');
  log.debug(req.body);
  log.debug('req.params:');
  log.debug(req.params);

  if (req.params.user)  {

    var user = req.params.user;
    log.debug('User: ' + user);

    //TODO: Delete users.
    UserModel.find({
      _id: req.params.user
    }).remove(function(err, user) {
      if(err) {
        log.error(err);
        return next(new error.InternalServerError(err));
      } else if(user) {
        res.status(200);
        return res.send(user);
      } else {
        log.error('Unknown error');
        return (next(new error.InternalServerError('Unknown Error')));
      }
    });
  } else {
    log.error('Delete User Bad Request');
    return next(new errors.BadRequestError('No user_id provided'));
  }

};

function getUserInfo(req, res, next)  {
  log.info(req.path());
  log.info('Get User Info');
  log.debug('getUserInfo()');
  log.debug('req.body:');
  log.debug(req.body);
  log.debug('req.params:');
  log.debug(req.params);

  if(req.params.user) {
    var user = req.params.user;
    log.debug('user: ' + user);

    UserModel.findById(user, function (err, doc)  {
      if(err) {
        log.error('Error getting the user: ' + user);
        log.error(err);
        return (next(new errors.InternalServerError(err)));
      } else if(doc)  {
        var publicUser = {
          _id: doc._id,
          mail: doc.mail,
          username: doc.username,
          fname: doc.fname,
          lname: doc.lname,
          supdate: doc.supdate,
          bloqList: doc.bloqList,
          bloquedAccount: doc.bloquedAccount,
          validatedMail: doc.validatedMail
        };
        res.status(200);
        res.json(200, publicUser);
      } else {
        log.error('Find User Unknown Error');
        return(next(new errors.InternalServerError('Unknow Error')));
      }
    });

  } else {
    log.error('Get User Info Bad Request');
    return (next(new errors.BadRequestError('No user provided')));
  }
}

module.exports = {
  addUser: addUser,
  deleteUser: deleteUser,
  getUserInfo: getUserInfo
}
