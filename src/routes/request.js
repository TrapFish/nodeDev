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
      message: "Connection request sent successfully",
      data: data
    })
  } catch (error) {
    res.status(400).send("ERROR :: " + error.message);
  }
});

module.exports = requestRouter;