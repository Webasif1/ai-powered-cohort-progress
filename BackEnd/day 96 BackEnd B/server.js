/**Import app to run the server */
const app = require('./src/app');
/**Import connectDB to connect to MongoDB */
const connectDB = require('./src/config/database');
/**Set the port for the server */
const PORT = process.env.PORT || 3000;

/**Connect to MongoDB */
connectDB();

/**Start the server and listen on the specified port */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
