const chalk = require("chalk");
const User = require("../../models/user");
const { Story, Person } = require("../../models/story");
const Character = require("../../models/character.js");
const { Movie, Info } = require("../../models/movie");
const httpStatus = require('http-status');
const errorFunction = require("./../../utils/errorFunction");
const ApiError = require('./../../utils/ApiError');
const BaseError = require('./../../utils/BaseError');
const logger = require('./../../config/logger');
  const _ = require('lodash');
const mongoose = require('mongoose');
const getAllUsers = async (req, res, next) => {
    try {
        console.log(chalk.inverse("API Called - /users "));
        const users = await User.find({ is_active: true }).lean();
        if (users) {
           // return res.status(200).json(errorFunction(false, "Getting All Users", users));
			return res.status(200).json(errorFunction(false, "Success", users));
			logger.info(`${req.url} ${users}`);
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

const defaultuser =  async(req, res, next) => {
/*const Group = mongoose.model('Group', new mongoose.Schema({
	  name: String,
	  members: [{ type: mongoose.ObjectId, ref: 'Person' }]
	}));
	const Person = mongoose.model('Person', new mongoose.Schema({
	  name: String
	}));
   try {
	// Initialize data
	const people = await Person.create([
	  { name: 'Benjamin Sisko1' },
	  { name: 'Kira Nerys1' }
	]);
	await Group.create({
	  name: 'syst',
	  members: people.map(p => p._id)
	});

	// Execute a lean query
	const group = await Group.find().lean().populate('members');
	//console.log(group.members[0].name); // 'Benjamin Sisko'
	//console.log(group.members[1].name); 
    res.status(200).json(group);	
	} catch (error) {
        console.log(chalk.red("Error :", error));
    }*/
	
		
		 let document;
		try{
			/*const author = new Person({
			  _id: new mongoose.Types.ObjectId(),
			  name: 'rajnesh',
			  age: 30
			});

			await author.save();

			  const story1 = new Story({
				title: 'title6',
				author: author._id    // assign the _id from the person
			  });

			  const storyData=await story1.save();*/
				// that's it!
			  //const storyRes=await Story.findOne({ name: 'title7' }).populate('author');
                 // storyRes.author = author;
				  // console.log(author);
				//console.log(storyRes);	
				// console.log(storyRes.author.name);
				//console.log(storyRes.title);		
				
			/*	await Story.find({title: /ti/i})            
             .populate('author', 'name')                    
             .exec(function(error, posts) {                
                if (error) res.status(400).json(error.message);
				//console.log(posts[0].title);
				//console.log(posts[0].author.name);	
				res.json(posts);
				
            				
             }) */

			/* const character = [
				  { "name": "Jean-Luc Picard", "age": 59, "rank": "Captain" },
				  { "name": "William Riker", "age": 29, "rank": "Commander" },
				  { "name": "Deanna Troi", "age": 28, "rank": "Lieutenant Commander"},
				  { "name": "Geordi La Forge", "age": 29, "rank": "Lieutenant" },
				  { "name": "Worf", "age": 24, "rank": "Lieutenant" }
                  ]*/
		
			/*document= await Character.insertMany([
				  { "name": "Jean-Luc Picard", "age": 59, "rank": "Captain" },
				  { "name": "William Riker", "age": 29, "rank": "Commander" },
				  { "name": "Deanna Troi", "age": 28, "rank": "Lieutenant Commander"},
				  { "name": "Geordi La Forge", "age": 29, "rank": "Lieutenant" },
				  { "name": "Worf", "age": 24, "rank": "Lieutenant" }
]);*/

				//document= await Character.create(character);

         /*document = await Character.aggregate([
			  {
				$group: {
				  // Each `_id` must be unique, so if there are multiple
				  // documents with the same age, MongoDB will increment `count`.
				  _id: "$age",
				  count: { $sum: 1 }
				}
			  }
			]);*/
			
			/*document = await Character.aggregate([
			  { $match: { age: { $eq: 29 } } },
			  {
				$group: {
				  _id: '$age',
				  count: { $sum: 1 },
				   total: { $sum: "$age" }
				}
			  }
			]);*/
			/*document = await Character.aggregate([
			  { $match: { age: { $eq: 29 } } },
			  {
				$group: {
				  _id: null,
				 //count: { $sum: 1 },
				  // total: { $sum: "$age" },
				   average: { $avg: "$age" }
				}
			  }
			]);*/
			
			/*document = await Character.aggregate([
			  {
				$group: {
				  _id: null,
				   total: { $sum: "$age" },
				 
				}
			  }
			]);*/
			
			
			/*Character.find({
				$text: {
					$search: req.body.name
				}
			}, function(err, result) {
				console.log(result);
			});*/
			
		       document = await Character.find({
				$text: {
					$search: req.body.name
				}
			});
			console.log(document);
		}catch(error){
			return res.json(error.message);
		}
		return res.status(200).json(document);

};

const infouser =  async(req, res, next) => {
	let movie1;

	try{
		
			
			// Load both the director and the actors
			/*let movie1 = await Movie.findOne().populate('director').populate('actors');
			console.log(movie1.director.name); // 'James Cameron'
			console.log(movie1.actors[0].name); // 'Arnold Schwarzenegger'
			console.log(movie1.actors[1].name); // 'Linda Hamilton'
				*/
				
			/*let movie = await Movie.findOne();
			// Populate the actors
			await movie.populate('actors').execPopulate();
			 // 'James Cameron'
			 console.log(movie.director.name);
			console.log(movie.actors[0].name); // 'Arnold Schwarzenegger'
			console.log(movie.actors[1].name); //*/
  
	 /* movie1=await Movie.findOne({},{_id:0}).populate([
		{ path: "director", select: { _id:0, name: 1 } },
		{ path: "actors", select: { _id:0, name: 1 } }
	  ]) ;
		console.log(movie1);*/
		//movie1=await Character.find().all('name',['Worf'])
		
		//movie1=await Character.find().where('age').gt(24)	;
		movie1=await Character.find().and([{ name: 'Worf' }, { age: 24 }]).select('-_id -__v');
			
	}catch(error)
	{
		return res.json(error.message);
	}
	return res.status(200).json(movie1);
};


module.exports = {
    getAllUsers: getAllUsers,
    getUser: getUser,
    addUser: addUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
	defaultuser:defaultuser,
	infouser:infouser
};
