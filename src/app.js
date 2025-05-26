const express = require('express');
require('dotenv').config({ path: './.env' })
const app = express();
const connectDb = require("./config/database");
const bodyParser = require('body-parser');
const PORT = process.PORT || 3000;
const cors = require('cors');
const allowedOrigin = ["http://localhost:5173", "http://13.51.13.44"]
require('./utils/cronjob'); // Importing the cron job to start it
app.use(cors({
  origin: allowedOrigin,
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


app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter)


connectDb().then(async (connection) => {
  console.log("Data Base is connected successfully");

  app.listen(PORT, () => {
    console.log(`Server is successfully listening on port ${PORT}....`);
  });
}).catch(async (error) => {
  console.log("Error in the connection")
});






