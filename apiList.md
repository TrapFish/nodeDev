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

Pagination

/feed?page=1&limit=10 => first 10 users 1-10 ==> .skip(0) and .limit(10)
/feed?page=2&limit=10 => 11-20 ==>.skip(10) and .limit(10)
/feed?page=3&limit=10 => 21-30 ==> .skip(20) and .limit(10)

.skip() and .limit()

skip = (page - 1)*limit