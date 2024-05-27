const expressAsyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const User = require("../models/admin/User");


const registerMiddleware = expressAsyncHandler(async (req, res, next) => {
    //console.log(req.body.config.headers.authorization);
    let token;
    if (req?.body.config.headers?.authorization?.startsWith("Bearer")) {
      token = req.body.config.headers.authorization.split(" ")[1];
      try {
        if (token) {
          const decoded = jwt.verify(token, process.env.REG_SECRET);
          next();
        }
      } catch (error) {
        throw new Error("Not authorized token expired, login again11: "+error);
      }
    } else {
      throw new Error("There is no token attached to the header");
    }
  });
  
module.exports = registerMiddleware;