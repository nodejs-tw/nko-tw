var MailChimpAPI = require('mailchimp').MailChimpAPI;

var config = require('../config');

var apiKey = config.mailchimp;

var listId = '-- list id --';


try { 
    var api = new MailChimpAPI(apiKey, { version : '2.0' });
} catch (error) {
    console.log(error.message);
}

module.exports.regist = function (req, res) {
    if ( ! api) {
        console.log('[STATUS] ERROR API is not existed');
        return res.redirect('/');
    } 

    api.call('lists', 'subscribe', {id: listId, email:{email:'user@user.com'}, merge_vars: null, email_type: 'html', double_optin: false, update_existing: false, replace_interests: false, send_welcome: true}, function (error, data) {
        if (error) {
            console.log(error.message);
            res.send(error.message);
        } else {
            console.log(JSON.stringify(data)); // Do something with your data!
            res.send(data);
        }
    });  
};

module.exports.list = function (req, res) {
    api.call('lists', 'list', {}, function (error, data) {
        if (error) {
            console.log(error.message);
            res.send(error.message);
        } else {
            console.log(JSON.stringify(data)); // Do something with your data!
            res.send(data);
        }
    });
};