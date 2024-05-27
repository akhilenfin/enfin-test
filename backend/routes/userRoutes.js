const express = require('express')
const { createUserController, loginController } = require('../controllers/admin/listUsersController')
const { createMovieController, listMovieController, editMovieController, updateMovieController, deleteMovieController, deleteBulk } = require('../controllers/admin/movieController')

const authMiddleware = require('../middleware/authMiddleware')

const registerMiddleware = require('../middleware/registerMiddleware')


const userRoutes = express.Router()
const { generateRegToken } = require('../config/token/generateToken')

userRoutes.post('/register', createUserController)
userRoutes.post('/login', loginController)
userRoutes.post('/createmovie', authMiddleware, createMovieController)
userRoutes.post('/listmovies', authMiddleware, listMovieController)
userRoutes.post('/editmovies/:id', authMiddleware, editMovieController)
userRoutes.post('/updatemovies/:id', authMiddleware, updateMovieController)
userRoutes.post('/deletemovies/:id', authMiddleware, deleteMovieController)
userRoutes.post('/deletebulk', authMiddleware, deleteBulk)



userRoutes.post("/", (req, res) => {
    res.send("Hello, world!");
});

module.exports = userRoutes