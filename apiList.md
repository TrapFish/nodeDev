#List of APIS

authRouter
-POST /signup
-POST /login
-POST /logout

profileRouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

connectionRequestRouter
-POST /request/send/interested/:userId
-POST /request/send/ignored/:userId

-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

userRouter
-GET /user/connections
-GET /user/request
     /user/recieved

-GET /user/feed -- Gets you the profiles of the other users on platforms



Status: ignored(pass), interested(like), accepted, rejected



to build a project in netify 

npm run build
it gives a static server that we can use on computer
npm install -g serve
serve -s build
go to netlify.com and sign in

