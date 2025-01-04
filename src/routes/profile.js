const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require('../middlewares/auth');

profileRouter.get('/profile', userAuth , async (req, res) => {
    try {
      //Get the token from the cookie
      // const cookie = req.cookies;
      // const {token} = cookie; 
  
      //Verify the token
      //const decodedMessage = await jwt.verify(token, "DEV@NoDE030492");
  
      //Get the user data
      //const {_id} = decodedMessage;
      //const user = await User.findById(_id);
      const user = req.user;
  
      console.log("User", user);
      // if(!user){
      //   throw new Error("User not found");
      // }
      //Send the user data
      res.send(user);
    } catch (error) {
      res.status(400).send("ERROR :: " + error.message);
    }
  })

module.exports = profileRouter;