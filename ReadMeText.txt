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
=========================


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

=============================================

Routing and Middleware
==========================

Understanding app.use() vs. HTTP Methods in Express.js

In Express.js, app.use() and HTTP methods like GET, POST, PUT, DELETE, etc., are fundamental tools for defining routes and handling requests. However, they serve distinct purposes.

app.use():

Global Middleware: When used without a specific path, app.use() defines middleware that will be executed for every incoming request to the application.
Route-Specific Middleware: When used with a path, app.use() defines middleware that will be executed only for requests matching that specific path.
HTTP Methods:

Specific Request Handling: HTTP methods are used to define specific actions that can be performed on a resource. For example:
GET: Retrieves a resource.
POST: Creates a new resource.
PUT: Updates an existing resource.
DELETE: Deletes a resource.
Key Differences:

Feature	app.use()	HTTP Methods
Scope	Global or route-specific	Specific to a particular HTTP method
Purpose	Middleware functions (logging, error handling, authentication)	Handling specific HTTP requests
Execution Order	Global middleware is executed first, followed by route-specific middleware	HTTP methods are executed after matching routes

============================
***** NEXT parameter ******
============================
app.get ("/", 
    (req, res, next)=>{
        // it will come here and return the data , if it is commented and then we hit the server then it will move to infinite loop as we haven't called next
        // next is the additional feature added here or additional parameter to handle the next response
     
     //   res.send ("Hello world");
     next();
    }, 
    (req,res)=>{
    res.send("Hello World 2")

})



exception
==========

case1
=======
// here we are calling the "/", then the first request handler come in the picture and then it will send Hello world to the server and TCP connection is closed
// then it will hit next and since the socket is closed it will through error 
// Here the output will be Hello World , with error
app.get ("/", 
    (req, res, next)=>{
       
        res.send ("Hello world");
         next();
       
    }, 
    (req,res)=>{
    res.send("Hello World 2")

})

// here we are calling the "/", then the first request handler come in the picture and then it will call the next function and then send res
// with Hello World 2
// and then throw error as socket will be closed 

app.get ("/", 
    (req, res, next)=>{
         next();
        res.send ("Hello world");
       
    }, 
    (req,res)=>{
    res.send("Hello World 2")

})


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




