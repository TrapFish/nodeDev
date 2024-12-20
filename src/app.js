const express = require('express');
const app = express();
const connectDb = require("./config/database");
const bodyParser = require('body-parser');
const PORT = process.PORT || 3000;
const User = require("./models/user");


app.use(bodyParser.json());
//app.use(express.json()); -- same functionality of the body parser

app.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password, age, gender } = req.body;
  const newUser = new User({
    firstName,
    lastName,
    emailId,
    password,
    age,
    gender
  });

  try {
    await newUser.save();
    res.send("User is saved");
  } catch (error) {
    res.status(400).send(error.message);
  }

});


app.get("/signup", async (req, res) => {
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

app.delete("/user", async (req, res)=>{
   const userId =  req.body.userId;
   console.log("Delete", userId);
   try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully")
   } catch (error) {
    res.status(400).send(error);
   }
})

app.patch("/user", async (req, res)=>{
  const userId = req.body.userId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate(userId, {emailId: data.emailId});
    res.send("Data is updated for the user")
  } catch (error) {
    res.status(400).send(error);
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






