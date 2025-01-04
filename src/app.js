const express = require('express');
const app = express();
const connectDb = require("./config/database");
const bodyParser = require('body-parser');
const PORT = process.PORT || 3000;
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require('bcrypt');
const validator = require('validator');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


app.use(bodyParser.json());
app.use(cookieParser());
//app.use(express.json()); -- same functionality of the body parser

app.post("/signup", async (req, res) => {

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

app.post('/login' ,   async (req, res) => {
  try {
    const {emailId , password} = req.body;
    if(!validator.isEmail(emailId)){
      throw new Error("Email is not valid");
    }
   
    const userFind = await User.findOne({ emailId });
    if(!userFind){
      throw new Error("Invalid Credentials");
    }
    const isPassWordValid = await bcrypt.compare(password, userFind?.password);
    if(isPassWordValid){
     //create  a JWT token
     const token = await jwt.sign({_id: userFind._id}, "DEV@NoDE030492")
    
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

app.get('/profile', async (req, res) => {
  try {
    //Get the token from the cookie
    const cookie = req.cookies;
    const {token} = cookie; 

    //Verify the token
    const decodedMessage = await jwt.verify(token, "DEV@NoDE030492");

    //Get the user data
    const {_id} = decodedMessage;
    const user = await User.findById(_id);

    if(!user){
      throw new Error("User not found");
    }
    //Send the user data
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR :: " + error.message);
  }
})

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      res.status(400).send("No record found");
    } else {
      res.send(users);
    }

  } catch (error) {
    res.status(400).send(error);
  }

});

app.get("/getUser", async (req, res) => {
  try {
    let emailId = req.body.emailId;
    const users = await User.find({
      emailId: emailId
    });
    if (users.length === 0) {
      res.status(400).send("No record found");
    } else {
      res.send(users);
    }

  } catch (error) {
    res.status(400).send(error);
  }
})

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  console.log("Delete", userId);
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully")
  } catch (error) {
    res.status(400).send(error);
  }
})

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;


  try {
    // await User.findByIdAndUpdate(userId, {emailId: data.emailId});
    const ALLOWED_UPDATES = [
      "photoUrl", "about", "gender", "age", "skills"
    ]

    const isUpdateAllowed = Object.keys(data).every(k => ALLOWED_UPDATES.includes(k));

    if (!isUpdateAllowed) {
      throw new Error("Update Not allowed");
    }

    if (data?.skills.length > 10) {
      throw new Error("Skills cann't be more than 10");
    }

    await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("Data is updated for the user")
  } catch (error) {
    res.status(400).send(error.message);
  }
})

connectDb().then(async (connection) => {
  console.log("Data Base is connected successfully");

  app.listen(PORT, () => {
    console.log(`Server is successfully listening on port ${PORT}....`);
  });
}).catch(async (error) => {
  console.log("Error in the connection")
});






