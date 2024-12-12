const express = require('express'); 
const app = express(); 
const PORT = process.PORT || 3000;

app.use('/',(err, req, res, next)=>{
    if(err) {
      res.send("error 8")
    }
})

app.get("/userSS", (req, res)=>{
    throw new Error("Error is getting thrown");
    // try {
    //     throw new Error("Error is getting thrown");
    // } catch (error) {
    //     console.log("Line 21 with error");
    //     res.status(500).send("Error is there ")
    // }
})

app.use('/',(err, req, res, next)=>{
    if(err) {
      res.send("error 23")
    }
})

app.listen(PORT, ()=>{
    console.log(`Server is successfully listening on port ${PORT}....`);
});




