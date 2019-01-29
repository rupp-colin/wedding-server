const express = require('express');
const Guest = require('../models/guests.js');
const nodemailer = require('nodemailer');
const { EMAIL_ADDRESS, EMAIL_PASS, COLIN, KELSEY } = require('../config.js');

const router = express.Router();

// ****************** POST new guest info ************* //
router.post('/', (req, res, next) => {
  //pull the appropriate fields off the request body
  const { rsvp, guestName, message, dietaryRestrictions } = req.body;

  if (!guestName || !rsvp) {
    const err = new Error('Missing required field.  Request must contain fields "guestName" and "rsvp"');
    err.status = 400;
    return next(err);
  }

  //assign them to a new object to be passed into the DB
  const guestData = {rsvp, guestName, message, dietaryRestrictions};

  Guest
    .create(guestData)
    .then(result => {
      res.status(201).json(result);
    })
    .then(result => {
      sendMail(guestData);
    })
    .catch(err => {
      next(err);
    });
});


module.exports = router;

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
