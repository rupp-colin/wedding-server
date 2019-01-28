const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  rsvp: { type: String, required: true },
  guestName: { type: String, required: true },
  message: { type: String },
  dietaryRestrictions: { type: String },
})

guestSchema.set('toObject', {
  virtuals: true,
  versionKey: false,
  tranform: (doc, result) => {
    delete: result._id;
    delete: result.__v;
  }
})

module.exports = mongoose.model('Guest', guestSchema)
