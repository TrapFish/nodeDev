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




