const accountLoginController = require('../Controllers/accountLoginController')
const accountSignupController = require('../Controllers/accountSignupController')
const express = require('express')

module.exports = function(app, express) {

    var api = express.Router();

    api.post('/signup', accountSignupController.signup);

    api.post('/login', accountLoginController.login);

    api.get('/', function(req, res) {
        console.log('Cookies: ', req.cookies)
        res.send({
          status: true,
          message: "Hello world"
        });
      });
    return api;
}