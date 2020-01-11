let mongoose = require('mongoose');

let Schema = mongoose.Schema;
let bcrypt = require('bcryptjs');

let UserSchema = new Schema({
  email: { type: String, required: true, index: {unique: true}},
  password: { type: String, required: true},
  token: String,
  verification: { type: Number, default: 0},
  isStudent: {type: Boolean, default: true},
  createdAt: { type: Date, default: Date.now},
  updatedAt: { type: Date, default: Date.now}
});

UserSchema.pre('save', function(next) {

  let user = this;

  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, 10, function(err, hash){
    if (err) return next();

    user.password = hash;
    next();

  });
});

UserSchema.methods.comparePassword = function(password){
  
  let user = this;

  return bcrypt.compareSync(password, user.password);
}


module.exports = mongoose.model('User', UserSchema);