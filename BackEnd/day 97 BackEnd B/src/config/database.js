/**Dotenv */
require('dotenv').config();
/**Require mongoose */
const mongoose = require('mongoose');
/**Connect to MongoDB using mongoose */
function connectDB() {
  mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
}

/**Export the connectDB function */
module.exports = connectDB;
