const nodemailer = require('../Functions/nodeMailer'); //todo

const sendWelcomeEmail = async(email) => {
  try {
    const emailBody = {
      subject: "welcome to skPaul services",
      text: `<p>Hey there, thank you for signing up.</p>`,
      html: `<p>Hey there, thank you for signing up.</p>`
    }
    await nodemailer.nodeMailer(email, emailBody);
    return console.log(`Welcome email sent to the email ${email}`);
  } catch(err) {
    return console.log(`Error catght in sendWelcomeEmail catch block ${err}`);
  }
}

module.exports = {
  sendWelcomeEmail
};
