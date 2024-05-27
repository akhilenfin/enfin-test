const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const expressAsyncHandler = require('express-async-handler');
const User = require('../../models/admin/User');
const { generateToken } = require('../../config/token/generateToken')



const createUserController = expressAsyncHandler( async (req, res) => {
    
    try{
        const { name, email, phone, password, userType } = req?.body;
        const userFound = await User.findOne({ email });
        if( userFound ){
            return res.status(409).json({message:'Email already exists'});
        }
        else{
            const user = await User.create({
                name: name,
                email: email,
                phone: phone,
                password: password,
                userType: userType
            });
            res.status(200).json({message:'User created successfully'});
        }
    }catch(err){
        res.status(400);
        res.json({message:err.message});
    }
})

const loginController = expressAsyncHandler(async (req, res) => {
    const { email, password } = req?.body;
    try{
        const user = await User.findOne({ email });
        if ( !user ) {
            return res.status(401).json({message:'Invalid login credentials'});
        }

        if (user && (await user.isPasswordMatched(password))) {
            const token = generateToken(user._id);
            return res.status(200).json( {"token" : token} );
        }
        else{
            res.status(401).json({message:'Invalid login credentials'});
        }
    }catch(err){
        res.status(400);
        res.json({message:err.message});
    }
})

module.exports = { createUserController, loginController };
