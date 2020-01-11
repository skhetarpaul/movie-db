const nodemailer = require('../Functions/nodeMailer'); 

const sendPasswordResetLink  = async(email) => {
  try {
    const emailBody = {
      subject: "Password reset link from skPaul services",
      text: `<p>Hey there, You requested for a password reset, 
      kindly use this ${<a href="{{url}}">link</a>} to reset your 
      password</p>`,
      html: `<p>Cheers!!</p>`
    }
    await nodemailer.nodeMailer(email, emailBody);
    return console.log(`Reset password link sent to mail ${email}`);
  } catch(err) {
    return console.log(`Error catght in sendPasswordResetLink catch block ${err}`);
  }
}

module.exports = {
    sendPasswordResetLink 
};
