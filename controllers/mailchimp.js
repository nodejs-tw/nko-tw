var MailChimpAPI = require('mailchimp').MailChimpAPI;

var config = require('../config');

var apiKey = config.mailchimp;

var listId = config.listId;

var emailRule = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

try { 
    var api = new MailChimpAPI(apiKey, { version : '2.0' });
} catch (error) {
    console.log(error.message);
}

var filterBefore = function (req, res) {
    if ( ! api) {
        console.log('[STATUS] ERROR API is not existed');
        res.redirect('/');
        return false;
    }; 
}

module.exports.subscribe = function (req, res) {
    
    var email = req.body.email;

    // validate error email

    if ( ! emailRule.test(email)) {
        console.log('[STATUS] error email');
        return res.render('2013/index', { title: 'Node.js Knockout 台灣黑客頌 - 48 小時不間斷挑戰', error: '請輸入正確 Email 格式' });
    }

    api.call('lists', 'subscribe', {id: listId, email:{email: email}, merge_vars: null, email_type: 'html', double_optin: false, update_existing: false, replace_interests: false, send_welcome: true}, function (error, data) {
        if (error) {
            console.log('[STATUS] error, ' + error.message);
            return res.render('2013/index', { title: 'Node.js Knockout 台灣黑客頌 - 48 小時不間斷挑戰', error: error.message });
            //return res.redirect('/error');
            // send mail
        } else {
            console.log('[STATUS] success, ' + JSON.stringify(data)); // Do something with your data!
            //return res.send('/success');
            return res.render('2013/index', { title: 'Node.js Knockout 台灣黑客頌 - 48 小時不間斷挑戰', success: '註冊成功，請至信箱確認已完成流程。' });
        }
    });  
};