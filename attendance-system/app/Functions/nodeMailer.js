var nodemailer = require('nodemailer');

module.exports = {
  
  nodeMailer : function(email, emailBody){
    console.log(`mail sent to the email ${email}`)
    let attachment;
    attachment = emailBody.attachments;
    if (!attachment) {
      attachment = null;
    }
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        // var transporter = nodemailer.createTransport({
        //   sendmail: true,
        //   newline: 'unix',
        //   path: '/usr/sbin/sendmail'
        // });
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
                 user: 'saranshkhetarpaul99@gmail.com',
                 pass: 'hsnaras89'
             }
         });

        const mailOptions = {
          from: 'saranshkhetarpaul99@gmail.com', // sender address
          to: email, // list of receivers
          bcc: 'saranshkhetarpaul99@gmail.com',
          replyTo: 'saranshkhetarpaul99@gmail.com',
          subject: 'mail from saransh khetarpaul', // Subject line
          html: emailBody.html,
          attachments: attachment,
          text: emailBody.text,// plain text body
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });
  }
}
