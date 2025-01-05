const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const { validateProfileEditData } = require("../utils/validation");

profileRouter.get('/profile/view', userAuth , async (req, res) => {
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
  
      // if(!user){
      //   throw new Error("User not found");
      // }
      //Send the user data
      res.send(user);
    } catch (error) {
      res.status(400).send("ERROR :: " + error.message);
    }
  });

profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
  try {
    if (!validateProfileEditData(req)) {
      throw new Error("Invalid Edit Data");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });

    loggedInUser.save();
    //res.send(`${loggedInUser.firstName} ${loggedInUser.lastName} , congrats! Your Profile Updated successfully`);
    res.json({message: `${loggedInUser.firstName} ${loggedInUser.lastName} , congrats! Your Profile Updated successfully`, updatedUser: loggedInUser});
  } catch (error) {
    res.status(400).send("ERROR :: " + error.message);
  }
});

module.exports = profileRouter;