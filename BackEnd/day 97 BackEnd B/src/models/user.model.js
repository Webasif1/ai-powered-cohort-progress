/**Mongoose model for User */
const mongoose = require('mongoose');

/**Define the User schema */
const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: [true, 'With this email already exists, please try another one.'],
  },
  password: String,
});

/**Create the User model from the schema */
const User = mongoose.model('User', userSchema);
/**Export the User model */
module.exports = User;
