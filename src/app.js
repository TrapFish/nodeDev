const express = require('express'); 
const app = express(); 
const PORT = process.PORT || 3000;

app.get ("/", 
    (req, res, next)=>{
        // it will come here and return the data , if it is commented and then we hit the server then it will move to infinite loop as we haven't called next
        // next is the additional feature added here or additional parameter to handle the next response
        next();
    }, 
    (req,res)=>{
    res.send("Hello World 2")

})


app.listen(PORT, ()=>{
    console.log(`Server is successfully listening on port ${PORT}....`);
});




