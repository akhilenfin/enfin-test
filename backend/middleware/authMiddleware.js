const expressAsyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const User = require("../models/admin/User");


const authMiddleware = expressAsyncHandler(async (req, res, next) => {
    let token;
    if (req?.headers?.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      try {
        if (token) {
          const decoded = jwt.verify(token, process.env.SECRET);
          
          const user = await User.findById(decoded?.id).select("-password");
         
          req.user = user;
          next();
        }
      } catch (error) {
        res.status(401)
        throw new Error("Not authorized token expired, login again");
      }
    } else {
      res.status(401)
      throw new Error("There is no token attached to the header");
    }
  });
  
  module.exports = authMiddleware;