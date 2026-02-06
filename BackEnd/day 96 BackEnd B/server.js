/**Import app to run the server */
const app = require('./src/app');

/**Set the port for the server */
const PORT = process.env.PORT || 3000;


/**Start the server and listen on the specified port */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
