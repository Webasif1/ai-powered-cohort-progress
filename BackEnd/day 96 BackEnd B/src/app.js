/**Require express to create server */
const express = require('express');

/**Create an instance of express */
const app = express();





/****Middleware to parse JSON request body */
app.use(express.json());
/**Middleware public directory */
app.use(express.static('public'));


/**Module exports app to run server */
module.exports = app;
