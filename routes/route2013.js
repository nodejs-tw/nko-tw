/*
 * GET home page.
 */

var request = require('request');
var config = require('../config');
var User = require('../lib/user');

exports.index = function(req, res){
  res.render('2013/index', {
    title: 'Node.js Knockout 台灣黑客頌 - 48 小時不間斷挑戰',
    githubClientID: config.github.clientID,
    user: req.session.user
  });
};

var mailchimp = require('../controllers/mailchimp');

exports.subscribe = mailchimp.subscribe;

exports.list = mailchimp.list;

exports.success = mailchimp.success;

exports.error = function (req, res) {
	res.send('Error page');
};


exports.getSubscribe = function (req, res) {
	res.redirect('/');
};

exports.loginCallback = function (req, res, next) {
  var code = req.query.code;
  if (!code) {
    return next();
  }

  request.post({
    url: 'https://github.com/login/oauth/access_token',
    json: {
      client_id: config.github.clientID,
      client_secret: config.github.clientSecret,
      code: code
    }
  }, function (err, r, body) {
    if (err) {
      return next(err);
    }
    if (body.error) {
      if (body.error === 'access_denied') {
        return res.redirect('/');
      }
      return next(new Error('登入失敗'));
    }
    request.post({
      url: 'https://api.github.com/user?access_token=' + body.access_token,
      json: {}
    }, function (err, r, guser) {
      if (err) {
        return next(err);
      }

      body.name = guser.name;
      body.login = guser.login;
      body.avatar = guser.avatar_url;

      User.find(guser.login, function (err, user) {
        if (!user) {
          user = new User({});
        }

        user.name = guser.name;
        user.login = guser.login;
        user.avatar = guser.avatar_url;

        user.save(function (err) {
          if (err) {
            return next(err);
          }
          req.session.user = body;
          res.redirect('/');
        });
      });
    });
  });
};
