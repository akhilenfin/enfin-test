const express = require('express')
const multer = require("multer");
const fs = require('fs'); 
const csv = require('csv-parser');
const upload = multer({ dest: "uploads/" });


const { createUserController, loginController } = require('../controllers/admin/listUsersController')
const { createMovieController, listMovieController, editMovieController, updateMovieController, deleteMovieController, deleteBulk, bulkUpload } = require('../controllers/admin/movieController')

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
userRoutes.post('/upload_files', authMiddleware, bulkUpload)



// userRoutes.post("/upload_files", upload.array("files"), (req, res, next)=>{
//     try{
//         console.log("Uploading", req.body);
//         // let inputFilePath = req.files[0].path;
//         // console.log("Path",inputFilePath );
//         // fs.createReadStream(inputFilePath)
//         // .pipe(csv())
//         // .on('headers', (headers) => {
//         //     console.log('CSV Headers:', headers);
//         // })
//         // .on('data', function(data){
//         //     try {
//         //         console.log("Name is: "+ JSON.stringify(data));
//         //         //perform the operation
//         //     }
//         //     catch(err) {
//         //         //error handler
//         //     }
//         // })
//         // .on('end',function(){
//         //     //some final operation
//         // }); 
//         res.status(200).json({ message: "Successfully uploaded files" });
//     }catch(err){
//         console.log(err)
//         res.status(400);
//         res.json({message: err.message});
//     }
    
// });


userRoutes.post("/", (req, res) => {
    res.send("Hello, world!");
});

module.exports = userRoutes