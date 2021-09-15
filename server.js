const chalk = require("chalk");
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const mongoose = require("mongoose");
const httpStatus = require('http-status');
const logger = require('./config/logger');
const httpLogger = require('./config/httpLogger')
const unexpectedErrorHandler = require('./utils/unexpectedErrorHandler');
const { errorConverter,errorHandler } = require('./middleware/error');
const ApiError = require('./utils/ApiError');
const BaseError = require('./utils/BaseError');
require("./utils/dbConnection");
const routes = require("./routes/routes");
/*const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB connected...');
});*/
//require("dotenv").config();

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
app.use(express.json({ limit: "1000MB" }));
//app.use(httpLogger)
app.use((req, res, next) => {
  logger.info(req.body);
  let oldSend = res.send;
  res.send = function (data) {
    logger.info(JSON.parse(data));
    oldSend.apply(res, arguments);
  }
  next();
})
app.use(routes);






app.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    const status = err.status || 500;
	console.log(err.message);
   // res.status(status).json({ error: { message: err.message } });
  res.status(status).json(new BaseError(status,"Not found")) 
});
// send back a 404 error for any unknown api request
/*app.use((req, res, next) => {
  next(new BaseError(httpStatus.NOT_FOUND,'Not found'));
});*/

// convert error to ApiError, if needed
app.use(errorConverter);

app.use(errorHandler);

server.listen(port, () => {
                console.log("Server started on Port : ", port);
                //app.use("/", routes);
            });

process.on('uncaughtException', (error) => unexpectedErrorHandler(error, server));
process.on('unhandledRejection', (error) => unexpectedErrorHandler(error, server));

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
	mongoose.connection.close();
  }
});

// Close the Mongoose connection, when receiving SIGINT
/*process.on('SIGINT', () => {
 mongoose.connection.close(() => {
  console.log('Force to close the MongoDB conection')
  process.exit(0)
 })
})*/
module.exports=app;
// send back a 404 error for any unknown api request
/*app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});*/
