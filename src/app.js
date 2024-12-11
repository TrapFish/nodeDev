const express = require('express'); 
const app = express(); 
const PORT = process.PORT || 3000;

const {authAdmin} = require("./middlewares/auth.js");


app.use('/admin', authAdmin);

app.get("/user", (req, res) => {
    res.send("User is fetched")
})

app.get("/admin", (req, res) => {
    res.send("Hello World");
})

app.get("/admin/getAllData", (req, res)=>{
    res.send("Data is sent back from admin")
})

app.get("/admin/deleteAllData", (req, res)=> {
    res.send("Data is deleted")
})

app.listen(PORT, ()=>{
    console.log(`Server is successfully listening on port ${PORT}....`);
});




