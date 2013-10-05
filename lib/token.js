'use strict';

var config = require('../config');
var uuid = require('node-uuid');
var FirebaseTokenGenerator = require("firebase-token-generator");
var tokenGenerator = new FirebaseTokenGenerator(config.firebase.secret);

module.exports = function () {
  return tokenGenerator.createToken({uuid: uuid.v4()}, {admin: true});
};
