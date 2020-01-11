const nodemailer = require('../Functions/nodeMailer'); 

const sendPasswordResetConfirmation  = async(email) => {
  try {
    const emailBody = {
      subject: "Password reset link from skPaul services",
      text: `<p>Hey there, You requested for a password reset, 
      Your password has been successfully updated withn us.</p>`,
      html: `<p>Cheers!!</p>`
    }
    await nodemailer.nodeMailer(email, emailBody);

    return console.log(`password reset confirmation mail sent to  ${email}`);
  } catch(err) {
    return console.log(`Error catght in sendPasswordResetConfirmation catch block ${err}`);
  }
}

module.exports = {
    sendPasswordResetConfirmation
};

