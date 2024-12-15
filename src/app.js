const express = require('express'); 
const app = express(); 
const connectDb = require("./config/database");
const PORT = process.PORT || 3000;




connectDb().then(async (connection) => {
  console.log("Data Base is connected successfully");

  app.listen(PORT, () => {
    console.log(`Server is successfully listening on port ${PORT}....`);
  });
}).catch(async (error) => {
  console.log("Error in the connection")
});






