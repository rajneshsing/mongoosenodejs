const chalk = require("chalk");
const User = require("../../models/user");
const httpStatus = require('http-status');
const errorFunction = require("./../../utils/errorFunction");
const ApiError = require('./../../utils/ApiError');
const BaseError = require('./../../utils/BaseError');
const logger = require('./../../config/logger');
  const _ = require('lodash');
const getAllUsers = async (req, res, next) => {
    try {
        console.log(chalk.inverse("API Called - /users "));
        const users = await User.find({ is_active: true }).lean();
        if (users) {
           // return res.status(200).json(errorFunction(false, "Getting All Users", users));
			return res.status(200).json(errorFunction(false, "Success", users));
         } else {
			
            res.status(401);
            return res.json(errorFunction(true, "Error Getting All Users"));
        }
    } catch (error) {
		logger.error(`Error connecting to DB ! Error ${req.url} ${error}`);
        //console.log(chalk.bgRed.black("Error : ", error));
		return res.json(errorFunction(true, "failed to get the data", users));
    }
};

const getUser = async (req, res, next) => {
    try {
        console.log(chalk.inverse("API Called - /user "));
        if (req.body.email !== undefined) {
            const user = await User.findOne({ email: req.body.email }).lean();
            if (user) {
                res.status(200);
                return res.json(
                    errorFunction(false, "Fetched User Successfully", user)
                );
            }
            res.status(400);
            return res.json(errorFunction(true, "User Does not exist"));
        } else {
            res.status(400);
			// return res.json(errorFunction(false,"Please Provide Valid Email "));
           return res.json(new BaseError("email",400, "Please Provide Valid Email "));
        }
    } catch (error) {
        console.log(chalk.bgRed.black("Error : ", error));
    }
};

const addUser = async (req, res, next) => {
	
	//const filter = _.pick(req.body, ['firstName', 'lastName', 'email', 'mobileNumber']);
	//console.log(filter);
    console.log(chalk.inverse("API Called - /addusers"));
    try {
        const existingUser = await User.findOne({
            email: req.body.email,
        }).lean();
        if (existingUser) {
           // res.status(400);
           // return res.json(errorFunction(true, "User Already Exists"));
			return res.json(new BaseError(400,'User Already Exists'));
        } else {
            try {
                const newUser = await User.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    mobileNumber: req.body.mobileNumber,
                    country: req.body.country,
                    darkTheme: req.body.darkTheme,
                    is_active: req.body.is_active,
                });
				
                //res.status(201);
				return res.json(new BaseError(201,'User Added Successfully',newUser));
                //return res.json( errorFunction(false, "User Added Successfully", newUser) );
            } catch (error) {
                console.log(chalk.red("Error : ", error));
            }
        }
    } catch (error) {
        console.log(chalk.red("Error :", error));
    }
};

const deleteUser = async (req, res, next) => {
    try {
        console.log(chalk.inverse("API Called - /deleteuser "));
        if (req.body.email !== undefined) {
            const deletedUser = await User.findOneAndRemove({
                email: req.body.email,
            }).lean();
            if (deletedUser) {
                res.status(200);
                res.json(errorFunction(false, "Deleting User", deletedUser));
            } else {
                res.status(400);
                res.json(errorFunction(true, "User does not exists"));
            }
        }
    } catch (error) {
        console.log(chalk.red("Error :", error));
    }
};

const updateUser = async (req, res, next) => {
    try {
        console.log(chalk.inverse("API Called - /updateuser "));
        if (req.body.email !== undefined) {
            const updatedUser = await User.findOneAndUpdate(
                req.body.email,req.body
            ).lean();
            if (!updatedUser) {
                res.status(400);
                return res.json(errorFunction(true, "User does not exists"));
            } else {
                res.status(200);
                return res.json(
                    errorFunction(
                        false,
                        "User updated Successfully",
                        updatedUser
                    )
                );
            }
        }
    } catch (error) {
        console.log(chalk.red("Error :", error));
    }
};

module.exports = {
    getAllUsers: getAllUsers,
    getUser: getUser,
    addUser: addUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
};
