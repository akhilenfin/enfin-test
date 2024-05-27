const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new mongoose.Schema({
    title: {
        required: [true, 'Movie name is required'],
        type: String
    },
    description: {
        required: [true, 'Movie description is required'],
        type: String
    },
    release_date: {
        required: [true, 'Release date is required'],
        type: Date
    },
    genre: {
        type: String,
        required: [true, 'Genre is required']
    },
    user_id:{ type: Schema.Types.ObjectId, ref: 'User' }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
})

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
