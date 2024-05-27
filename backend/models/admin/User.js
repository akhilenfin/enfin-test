const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')

//Schema

const userSchema = new mongoose.Schema({
    name: {
        required: [true, 'First name is required'],
        type: String
    },
    email: {
        required: [true, 'Email is required'],
        type: String
    },
    phone:{
        type: Number,
        required: [true, 'Phone number is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    userType: {
        type: String
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    var salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.methods.isPasswordMatched = async function (enteredPassowrd) {
    return await bcrypt.compare(enteredPassowrd, this.password)
}

const User = mongoose.model("User", userSchema)

module.exports = User