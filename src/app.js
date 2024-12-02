const express = require('express'); 
const app = express(); 
const PORT = process.PORT || 3000;



app.listen(PORT, ()=>{
    console.log(`Server is successfully listening on port ${PORT}....`);
});




