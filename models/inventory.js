const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const characterSchema = Schema({
		
		  item:{
				type: String,
				unique: true
			  },
		  sizes:{
			type: [String],
			unique: true 
		  }
		});
const Inventory = mongoose.model("Inventory", characterSchema);

module.exports = Inventory;
