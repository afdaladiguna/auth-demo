const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username cannot empty'],
  },
  password: {
    type: String,
    required: [true, 'Password cannot empty'],
  },
});

module.exports = mongoose.model('User', userSchema);
