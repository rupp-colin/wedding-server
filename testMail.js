const nodemailer = require('nodemailer');

async function main(){

  let account = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    //code specifically for sending messages from gmail
    service: "gmail",
    auth: {
      user: 'myemail@gmail.com',
      pass: 'my password'
    }
  });

  let mailOptions = {
    from: '"Colin the Hacker" <rupp.colin@gmail.com>',
    to: "kelsey.channing@gmail.com, rupp.colin@gmail.com",
    subject: "this is a test!",
    test: "Hello my love, I am sending this email through a script",
    html: "<h1></h1>"
  };

  let info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);
