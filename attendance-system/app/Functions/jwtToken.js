let jsonwebtoken = require('jsonwebtoken');
//const config = require('..../app/config/config');
const secretKey = "saranshKhetarpaul99";

module.exports = {
  createToken : function (user, callback) {

    var token = jsonwebtoken.sign({
      _id: user._id,
      name: user.name,
      email: user.email
    }, secretKey, {
      expiresIn: '365d'  //60*60*24
    });

    return token;
  }
}