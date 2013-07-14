
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('2013/index', { title: 'Node.js Knockout 台灣黑客頌 - 48 小時不間斷挑戰' });
};

var mailchimp = require('../controllers/mailchimp');

exports.regist = mailchimp.regist;

exports.list = mailchimp.list;
