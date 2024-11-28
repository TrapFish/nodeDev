const express = require('express');

//it is creating a new instance of the express js application. It is like to create a new server on express framework 
const app = express(); 
const PORT = process.PORT || 3000;


// here the call back function is called request handeler.here it will alaways send as a global response since here we are not respnding to the different routers
// so to handle different request , before the callback function we can pass route and make route sepecific
// will work on every route created
// app.use((req, res)=>{
//     res.send('Hello from the server')
// });
// app.use('/', (req, res)=>{
//     res.send('Default Page')
// });

app.use('/home', (req, res)=>{
    res.send('Hello from the server home page dvbfgvsdfvsfdsfgrr')
});

app.use('/about', (req, res)=>{
    res.send('Hello from the server about page')
});

// will be blocked for the home specfic and here if we call http://localhost:3000/ -- will give error 
// app.use('/home',(req, res)=>{
//     res.send('Hello from the server home page')
// })

app.listen(PORT, ()=>{
    console.log(`Server is successfully listening on port ${PORT}....`);
});




