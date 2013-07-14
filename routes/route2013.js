
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('2013/index', { title: 'Node.js Knockout 台灣黑客頌 - 48 小時不間斷挑戰' });
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