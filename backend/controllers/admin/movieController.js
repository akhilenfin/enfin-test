const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const expressAsyncHandler = require('express-async-handler');
const Movie = require('../../models/admin/Movie');
const {decodeToken} = require('../../config/token/generateToken')
const createMovieController = expressAsyncHandler( async (req, res) => {
    try{
        const { title, description, release_date, genre } = req?.body;
        const user_id = req?.user.id;   
        const parsedDate = new Date(release_date);
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ message: 'Invalid date format' });
        }
        const user = await Movie.create({
            title: title,
            description: description,
            release_date: parsedDate,
            genre: genre,
            user_id:user_id
        });
        res.status(200).json({message:'Movie added successfully'});
    }catch(err){
        res.status(400);
        res.json({message:err.message});
    }
})

const listMovieController = expressAsyncHandler( async (req, res) => {
    try{
        const { search, page, limit } = req.body;
        const user_id = req?.user.id;   
        const regex = new RegExp(search, 'i');
        const movie = await Movie.find({
            user_id: user_id,
            $or: [
                { title: { $regex: regex } },
                { description: { $regex: regex } },
            ],
        })
        .limit(parseInt(limit))
        .skip((parseInt(page) - 1) * parseInt(limit));
        const totalMovie = await Movie.find({
            user_id: user_id,
            $or: [
                { title: { $regex: regex } },
                { description: { $regex: regex } },
            ],
        });
        // const movie = await Movie.find({});
        res.status(200).json({"results":movie, "total": totalMovie});
    }catch(err){
        res.status(400);
        res.json({message:err.message});
    }
})

const editMovieController = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json({"results":movie});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMovieController = async (req, res) => {
    try {
        const { title, description, release_date, genre } = req.body;

        // Convert date string to Date object
        const parsedDate = new Date(release_date);
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ message: 'Invalid date format' });
        }

        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        movie.title = title;
        movie.release_date = parsedDate;
        movie.description = description;
        movie.genre = genre;
        // update other fields as necessary

        await movie.save();
        res.status(200).json({"message" : "Movie updated successfully"});
    }catch ( error ){
        res.status(500).json({ message: error.message });
    }
};

const deleteMovieController = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteBulk = expressAsyncHandler( async (req, res) => {
    try{
        const idsToDelete = JSON.parse( req?.body.ids);
        const objectIds = idsToDelete.map(id => new mongoose.Types.ObjectId(id));
        const deleteResult = await Movie.deleteMany({ _id: { $in: objectIds } });
        res.json({ message: `Deleted ${deleteResult.deletedCount} documents` });
    }catch(err){
        console.log(err)
        res.status(400);
        res.json({message: err.message});
    }
})

module.exports = { createMovieController, listMovieController, editMovieController, updateMovieController, deleteMovieController, deleteBulk };
