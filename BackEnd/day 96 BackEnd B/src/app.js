/**Require express to create server */
const express = require('express');
/**Import authRouter from routes/auth.routes.js */
const authRouter = require('./routes/auth.routs');
/**Create an instance of express */
const app = express();





/****Middleware to parse JSON request body */
app.use(express.json());
/**Middleware public directory */
app.use(express.static('public'));


/****Use authRouter for authentication routes */
app.use('/api/auth', authRouter);

/**Module exports app to run server */
module.exports = app;
