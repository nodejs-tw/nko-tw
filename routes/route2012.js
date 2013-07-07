
/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('2012/index', { title: 'Node.js Knockout 台灣黑客頌 - 48 小時不間斷挑戰' });
};
exports.new = function(req, res){
  res.render('2012/new', { title: 'Node.js Knockout 台灣黑客頌 - 48 小時不間斷挑戰' });
};
exports.agenda = function(req, res){
  res.render('2012/agenda', { title: 'Node.js Knockout 台灣黑客頌 - 48 小時不間斷挑戰' });
};
exports.judge = function(req, res){
  res.render('2012/judge', { title: 'Node.js Knockout 台灣黑客頌 - 48 小時不間斷挑戰' });
};
