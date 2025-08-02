const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  // If you want password-based auth later, add hashed password here
});

module.exports = mongoose.model('User', UserSchema);