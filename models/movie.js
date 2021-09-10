const mongoose = require('mongoose');
		const Schema = mongoose.Schema;

		const personSchema = Schema({
		  name: String
		});

		const movieSchema = Schema({
			  title: String,
			  director: {
				type: mongoose.ObjectId,
				ref: 'Info'
			  },
			  actors: [{
				type: mongoose.ObjectId,
				ref: 'Info'
			  }]
		});

		const Movie = mongoose.model('Movie', movieSchema);
		const Info = mongoose.model('Info', personSchema);

module.exports = {
    Movie, Info
}