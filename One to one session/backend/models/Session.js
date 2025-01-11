const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
  },
  peers: [{
    id: { type: String, required: true },
    socket: { type: Object, required: true }, // assuming socket is an object
  }],
});
  let Session = mongoose.model('Session', sessionSchema);
  
  module.exports = Session;