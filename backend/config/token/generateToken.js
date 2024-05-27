const jwt = require('jsonwebtoken')

const generateToken = (id) =>{
    return jwt.sign({id},process.env.SECRET ,{ expiresIn: "1d"})
}
const generateRegToken = (id) =>{
    return jwt.sign({ id }, process.env.REG_SECRET ,{ expiresIn: "1d"})
}


module.exports = {
    generateToken,
    generateRegToken
}