//require("dotenv").config();
/*const mongoose = require("mongoose");
const chalk = require("chalk");

const mongoUrl = 'mongodb://127.0.0.1:27017/testdbss';// process.env.MONGO_URL;
 console.log("test");

const dbConnect = async () => {
    try {
        const dbConnection = await mongoose.createConnection(
            mongoUrl,
            { useNewUrlParser: true, useUnifiedTopology: true },
            (error) => {
                if (error)
                    console.log(
                        chalk.bgRed.black(
                            "Error connecting to DB ! Error : ",
                            error
                        )
                    );
                else console.log(chalk.bgGreen.black("Connected to DB"));
            }
        );
    } catch (error) {
        console.log(chalk.red("Error : ", error));
    }
};

//MONGO_URL = "mongodb://127.0.0.1:27017/testdb";
//dbConnect();

module.exports = { dbConnect: dbConnect, dbConnection: this.dbConnection };*/
const mongoose = require("mongoose");
const chalk = require("chalk");
const logger = require('./../config/logger');
const mongoUrl = 'mongodb://127.0.0.1:27017/testdbss';//process.env.MONGO_URL;//'mongodb://127.0.0.1:27017/testdb';
const dbConnect=mongoose.connect(
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
           
        }
    }
);

module.exports=dbConnect;