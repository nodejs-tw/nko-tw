var MailChimpAPI = require('mailchimp').MailChimpAPI;

var config = require('../config');

var apiKey = config.mailchimp;


try { 
    var api = new MailChimpAPI(apiKey, { version : '2.0' });
} catch (error) {
    console.log(error.message);
}

module.exports = function (req, res) {
    if ( ! api) {
        console.log('[STATUS] ERROR API is not existed');
        return res.redirect('/');
    }

    api.call('campaigns', 'list', { start: 0, limit: 25 }, function (error, data) {
    if (error)
        console.log(error.message);
    else
        console.log(JSON.stringify(data)); // Do something with your data!
    });  
};