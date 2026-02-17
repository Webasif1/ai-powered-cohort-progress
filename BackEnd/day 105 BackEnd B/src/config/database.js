/**Require mongoose */
const mongoose = require("mongoose");

/**Connect To DB fnc */
async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected To DB Successfully");
  } catch (error) {
    console.log("Error Connecting To DB", error);
  }
}
/**Export Connect To DB Fnc */
module.exports = connectToDB;
