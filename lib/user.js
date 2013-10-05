'use strict';

var request = require('request');
var config = require('../config');
var token = require('./token');
var baseUrl = config.firebase.baseUrl + config.firebase.collections.users + '/';

module.exports = User;

function User(data) {
  var user = this;
  this.data = data;
  this.saved = false;
  this.changed = {};
  ['name', 'login', 'avatar'].forEach(function (key) {
    Object.defineProperty(user, key, {
      get: function () {
        return data[key];
      },
      set: function (v) {
        if (v !== data[key]) {
          data[key] = v;
          user.changed[key] = 1;
        }
      }
    });
  });
}

User.find = function (login, cb) {
  request(baseUrl + login + '.json', function (err, r, data) {
    if (err) {
      return cb(err);
    }
    if (!data.login) {
      return cb(null, null);
    }
    var user = new User(data);
    user.saved = true;
    cb(null, user);
  });
};

User.create = function (data, cb) {
  request.put({
    url: baseUrl + data.login + '.json?auth=' + token(),
    json: data
  }, function (err, r, data) {
    if (err) {
      return cb(err);
    }
    var user = new User(data);
    user.saved = true;
    cb(null, user);
  });
};

User.prototype.clearChanged = function () {
  var user = this;
  Object.keys(this.changed, function (key) {
    delete user.changed[key];
  });
  return this;
};

User.prototype.save = function (cb) {
  var user = this;
  if (this.saved) {
    this.update(cb);
  } else {
    request.put({
      url: baseUrl + user.login + '.json?auth=' + token(),
      json: user.data
    }, function (err) {
      if (err) {
        return cb(err);
      }
      user.clearChanged();
      user.saved = true;
      cb(null, user);
    });
  }
};

User.prototype.update = function (cb) {
  var user = this;
  var data = {};
  var keys  = Object.keys(this.changed);

  if (!keys) {
    return cb(null, this);
  }

  keys.forEach(function (key) {
    data[key] = user[key];
  });

  request.patch({
    url: baseUrl + user.login + '.json?auth=' + token(),
    json: data
  }, function (err) {
    if (err) {
      return cb(err);
    }
    user.clearChanged();
    cb(null, user);
  });
};
