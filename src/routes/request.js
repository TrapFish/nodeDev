const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require("../models/connectionRequest");

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

    // we will check if the request is already sent or not
    const existingRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if(existingRequest){
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