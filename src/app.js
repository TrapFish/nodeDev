const express = require('express');
const app = express();
const connectDb = require("./config/database");
const bodyParser = require('body-parser');
const PORT = process.PORT || 3000;
const cors = require('cors');

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  
}));
// const User = require("./models/user");
// const { validateSignUpData } = require("./utils/validation");
// const bcrypt = require('bcrypt');
// const validator = require('validator');
const cookieParser = require('cookie-parser');
// const jwt = require('jsonwebtoken');
// const { userAuth } = require('./middlewares/auth');

app.use(bodyParser.json());
app.use(cookieParser());
//app.use(express.json()); -- same functionality of the body parser


const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');


app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/', userRouter)




// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find();
//     if (users.length === 0) {
//       res.status(400).send("No record found");
//     } else {
//       res.send(users);
//     }

//   } catch (error) {
//     res.status(400).send(error);
//   }

// });

// app.get("/getUser", async (req, res) => {
//   try {
//     let emailId = req.body.emailId;
//     const users = await User.find({
//       emailId: emailId
//     });
//     if (users.length === 0) {
//       res.status(400).send("No record found");
//     } else {
//       res.send(users);
//     }

//   } catch (error) {
//     res.status(400).send(error);
//   }
// })

// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;
//   console.log("Delete", userId);
//   try {
//     const user = await User.findByIdAndDelete(userId);
//     res.send("User deleted successfully")
//   } catch (error) {
//     res.status(400).send(error);
//   }
// })

// app.patch("/user/:userId", async (req, res) => {
//   const userId = req.params?.userId;
//   const data = req.body;


//   try {
//     // await User.findByIdAndUpdate(userId, {emailId: data.emailId});
//     const ALLOWED_UPDATES = [
//       "photoUrl", "about", "gender", "age", "skills"
//     ]

//     const isUpdateAllowed = Object.keys(data).every(k => ALLOWED_UPDATES.includes(k));

//     if (!isUpdateAllowed) {
//       throw new Error("Update Not allowed");
//     }

//     if (data?.skills.length > 10) {
//       throw new Error("Skills cann't be more than 10");
//     }

//     await User.findByIdAndUpdate(userId, data, {
//       returnDocument: "after",
//       runValidators: true,
//     });
//     res.send("Data is updated for the user")
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// })

connectDb().then(async (connection) => {
  console.log("Data Base is connected successfully");

  app.listen(PORT, () => {
    console.log(`Server is successfully listening on port ${PORT}....`);
  });
}).catch(async (error) => {
  console.log("Error in the connection")
});






