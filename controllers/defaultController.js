const errorFunction = require("./../utils/errorFunction");
const chalk = require("chalk");
const logger = require('./../config/logger');
const defaultController = (req, res, next) => {
    console.log(chalk.inverse("API called - / "));
	logger.error(`${req.url} not found`);
    res.status(404);
    res.json(
        errorFunction(true, `${req.url} not found `)
    );
	
};

module.exports = defaultController;
