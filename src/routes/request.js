const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ['ignored', 'interested'];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(400).json({
        message: "User not found for whome the request is sent",
      })
    }

    // const sameUser = fromUserId === toUserId;
    // if (!sameUser) {
    //   return res.status(400).json({
    //     message: "You can not send request to yourself"
    //    });
    // }

    // we will check if the request is already sent or not
    const existingRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Request already sent",
      });
    }

    const connectuionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    });
    const data = await connectuionRequest.save();
    res.json({
      message: `${req.user.firstName} ${req.user.lastName} is ${req.params.status} in ${toUser.firstName} ${toUser.lastName}`,
      data: data
    })
  } catch (error) {
    res.status(400).send("ERROR :: " + error.message);
  }
});

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const status = req.params.status;
    const requestId = req.params.requestId;

    const allowedStatus = ['accepted', 'rejected'];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const connectionRequest = await  ConnectionRequest.findOne({_id: requestId, toUserId: loggedInUser._id, status: "interested"});

    if(!connectionRequest){
      return res.status(400).json({
        message: "This connection is not found"
      })
    } 

    connectionRequest.status = status;

    const data = await connectionRequest.save();
    res.status(200).json({
      message : `Connection is ${status}`,
      data : data
    })

  } catch (error) {
    res.status(400).send("Error :: " + error.message);
  }


})

module.exports = requestRouter;