const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const characterSchema = Schema({
		
		  name: String,
		  age: Number,
		  rank: String,
		});
characterSchema.index({ name: 'text' });
const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
