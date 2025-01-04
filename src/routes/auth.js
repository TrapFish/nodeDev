const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const validator = require('validator');
const bcrypt = require('bcrypt');
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
    try {
      //Validation of the Data
      validateSignUpData(req);
  
      const { firstName, lastName, emailId, password, age, gender } = req.body;
  
      //Encript the password and then store the data
      const passwordHash = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
        age,
        gender
      });
  
  
      await newUser.save();
      res.send("User is saved");
    } catch (error) {
      res.status(400).send("ERROR :: " + error.message);
    }
  
  });


authRouter.post('/login' ,   async (req, res) => {
    try {
      const {emailId , password} = req.body;
      if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");
      }
     
      const userFind = await User.findOne({ emailId });
      if(!userFind){
        throw new Error("Invalid Credentials");
      }
      const isPassWordValid = await userFind.validatePassword(password);
      if(isPassWordValid){
       //create  a JWT token
      //  const token = await jwt.sign({_id: userFind._id}, "DEV@NoDE030492",  { expiresIn: "7d" })
  
      const token = await userFind.getJWT();
      
       //Add the token to cookie and send the response back to the user
        res.cookie("token", token);
  
        res.send("User Logged in Successfully");
      } else {
        throw new Error("Invalid Credentials");
      }
    } catch (error) {
      res.status(400).send("ERROR :: " + error.message);
    }
});

module.exports = authRouter;