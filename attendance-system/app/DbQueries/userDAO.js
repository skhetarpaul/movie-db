const User = require('../models/user'); 

module.exports = {
  
    findBy: function(options) {
      return new Promise((resolve, reject) => {
        User.findOne(options, (err, data) => {
          if(err) {
            reject(err);
          }
          resolve(data);
        });
      });
    },

    create: function(body) {
        return new Promise((resolve, reject) => {
          const user = new User(body);
          user.save((err, data) => {
            if (err) {
              reject(err);
            }
            resolve(data);
          });
        });
    },

    update: function(where, update) {
        return new Promise((resolve, reject) => {
          User.update(where, {"$set": update}).exec((err, data) => {
            if (err) {
              reject(err);
            }
            resolve(data);
          });
        });
    },
}