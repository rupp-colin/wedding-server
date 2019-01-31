const nodemailer = require('nodemailer');
const { EMAIL_PASS, EMAIL_ADDRESS, COLIN, KELSEY } = require('../config.js');

async function sendMail(res){

  if (!res.message) {
    res.message = "You guys are the fucking best!";
  }
  if (!res.dietaryRestrictions) {
    res.dietaryRestrictions = "None";
  }
  let account = await nodemailer.createTestAccount();
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
    to: `${COLIN}, ${KELSEY}`,
    subject: "new RSVP",
    test: "sent new rsvp message",
    html: `
      <h2>New RSVP</h2>
      <ul>
        <li> Name: <span style="font-weight:bold; font-size:1.2em;">${res.guestName}</span></li>
        <li> Will be attanding: <span style="font-weight:bold; font-size:1.4em">${res.rsvp}</h3></li>
        <li> Dietary Restrictions: ${res.dietaryRestrictions} </li>
      </ul>
      <br>
      <p>${res.message}</p>
      `
  };

  let info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = sendMail;
