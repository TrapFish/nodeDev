const express = require('express');
const userRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require("../models/connectionRequest");
const User = require('../models/user');
const sendEmail  = require("../utils/sendEmail.js"); 
const USER_SAFE_DATA = 'firstName lastName age gender photoUrl about skills'

//get all the pending connection request for the logged in user
userRouter.get('/user/requests', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", USER_SAFE_DATA);

        //}).populate("fromUserId", ['firstName', 'lastName', 'emailId', 'age', 'gender', 'photoUrl','about', 'skills']);

        res.status(200).json({
            message: "Data fetched successfully",
            data: connectRequest
        })


    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

userRouter.get('/user/connections', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;


        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: 'accepted' },
                { fromUserId: loggedInUser._id, status: 'accepted' },
            ]
        }).populate('fromUserId', USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);

        const data = connectionRequest.map(row => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId
        });

        res.json({
            message: "Data is fectched",
            data: data
        })



    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

userRouter.get('/user/feed', userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user;

        const page = +req.query.page || 1;
        let limit = +req.query.limit || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).select("fromUserId toUserId");


        const hideUserFromFeed = new Set();

        connectionRequest.forEach(request => {
            hideUserFromFeed.add(request.fromUserId.toString());
            hideUserFromFeed.add(request.toUserId.toString());
        });


        const user = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUserFromFeed) } },
                { _id: { $ne: loggedInUser._id } }
            ],
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);

        res.send(user)

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

userRouter.get('/user/sendMail', async (req, res) => {
    let emailResult = await sendEmail.run();

    res.json({
        message: "Email is sent successfully",
        data: emailResult
    })
   
})

module.exports = userRouter;