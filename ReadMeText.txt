const express = require('express');

//it is creating a new instance of the express js application. It is like to create a new server on express framework 
const app = express(); 
const PORT = process.PORT || 3000;

// Here all route macthes as app.use  will match all the HTTP method API calls to /user, If we change the order then the process eof execution will change
// here it will match all the get , post , delete and everything 
// app.use("/user", (req,res)=>{
//     res.send("HRHJKHJKHJK");
// });


app.get("/user", (req, res)=>{
    res.send({firstName: "Kumar", lastName: "Gourav", email: "gourav3492@gmail.com"})
});

app.post("/user", (req, res)=>{
    console.log("Save Data to database");
    res.send("Data saved to the database successfully");
});

app.delete("/user", (req, res)=>{
    console.log("Data is deleted Successfully");
    res.send("Data is deleted successfully");
});

// Here since the order is changed so automatically it will handle the get post and delete (all the above mentioned method) automatically
app.use("/user", (req,res)=>{
    res.send("HRHJKHJKHJK");
});
// here the call back function is called request handeler.here it will alaways send as a global response since here we are not respnding to the different routers
// so to handle different request , before the callback function we can pass route and make route sepecific
// will work on every route created
// app.use((req, res)=>{
//     res.send('Hello from the server')
// });
// app.use('/', (req, res)=>{
//     res.send('Default Page')
// });

// app.use('/home/2', (req, res)=>{
//     res.send('Hello')
// });

// app.use('/home', (req, res)=>{
//     res.send('Hello from the server home page dvbfgvsdfvsfdsfgrr')
// });

// app.use('/about', (req, res)=>{
//     res.send('Hello from the server about page')
// });

// app.use('/', (req, res)=>{
//     res.send('Default Page')
// });

// will be blocked for the home specfic and here if we call http://localhost:3000/ -- will give error 
// app.use('/home',(req, res)=>{
//     res.send('Hello from the server home page')
// })

app.listen(PORT, ()=>{
    console.log(`Server is successfully listening on port ${PORT}....`);
});



Playing with routers

const express = require('express'); 
const app = express(); 
const PORT = process.PORT || 3000;

// here get request with /user and /us?er both will work as "s" become optional and will be able to /user or /uer
// here get request with /user and /us+er both will work as any number of "s" added and will be user for /user or /usssssser both will work, however it will fail in /ussseer as + is with s only and not with e.
// /us*er --> will work for /user, /usKumarGouraver --> both will work . as we can add any text between us and er , but yes it sould start with us and end with er
// group between the route /u(se)?r --> in route /user , "se" is optional we can use /ur also
//dynamic route /user/123=== /user/:userId -- req.params is used to read --- req.params
// query param --- ?userId=101&userText="Kumar"  -- req.query
app.get("/user/:userId/:userName", (req, res)=>{
    console.log("requested query param ::", req.query, req.params);
    res.send({firstName: "Kumar", lastName: "Gourav", email: "gourav3492@gmail.com"})
});


app.listen(PORT, ()=>{
    console.log(`Server is successfully listening on port ${PORT}....`);
});

