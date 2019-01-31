const nodemailer = require('nodemailer');
const { EMAIL_PASS, EMAIL_ADDRESS } = require('../config.js');

async function sendConfirmation(guestEmail){

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_ADDRESS,
      pass: EMAIL_PASS
    }
  });
  let mailOptions = {
    from: `"RSVP Gnome", <${EMAIL_ADDRESS}`,
    //TODO set up mine and kelsey's email in .env and config
    to: guestEmail,
    subject: "RSVP confirmation",
    test: "sent new rsvp message",
    html: `
      <h2>Thanks for the RSVP</h2>
      <p>Your RSVP has been recieved!</p>
      `
  };

  let info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = sendConfirmation;
