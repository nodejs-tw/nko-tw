
/*
 * GET home page.
 */

var route2012 = require('./route2012'),
	route2013 = require('./route2013')

var set = function (app) {

	// 2012
	app.get('/2012', route2012.index);
	app.get('/2012/new', route2012.new);
	app.get('/2012/agenda', route2012.agenda);
	app.get('/2012/judge', route2012.judge);

	// 2013
	app.get('/2013', route2013.index);
	app.get('/', route2013.index);
	app.get('/index', route2013.index);

};

module.exports.set = set;
