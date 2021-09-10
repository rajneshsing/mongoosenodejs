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

//require("dotenv").config();

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
app.use(express.json({ limit: "100MB" }));
app.use(httpLogger)
app.use(routes);
/*const mongoUrl = 'mongodb://127.0.0.1:27017/testdbss';//process.env.MONGO_URL;//'mongodb://127.0.0.1:27017/testdb';
console.log(`server ${mongoUrl}`)
mongoose.connect(
    mongoUrl,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false },
    (error) => {
        if (error)
		{
		logger.info(`Error connecting to DB ! Error ${error}`);
            console.log(
                chalk.bgRed.black("Error connecting to DB ! Error : ", error) );
		}
        else {
            console.log(chalk.bgGreen.black("Connected to DB "));
			logger.info(`Connected to DB `);
            //   server.close();
            server.listen(port, () => {
                console.log("Server started on Port : ", port);
                app.use("/", routes);
            });
        }
    }
);*/
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
  }
});
module.exports=app;
// send back a 404 error for any unknown api request
/*app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});*/
