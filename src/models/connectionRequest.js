const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const connectionRequestSchema = new Schema({
   fromUserId: {
       type: Schema.Types.ObjectId,
       ref: "User", // reference to the User Collection
       required: true,
   },
   toUserId :{
         type: Schema.Types.ObjectId,
         ref: "User",
         required: true,
   },
    status: {
         type: String,
         enum: {
             values: ['ignored', 'interested','accepted', 'rejected'],
             message: '{VALUE} is not supported'
         },
    },
}, {
    timestamps: true
});


//connectionRequest.find({fromUserId: , toUserID: })
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 })

// it will be called before any save and hence called pre save
connectionRequestSchema.pre('save', async function (next) {
    const connectionRequest = this;
    // will be checking the toUserId and fromUserId are same or not
    if(connectionRequest.fromUserId .equals(connectionRequest.toUserId)){
        throw new Error("You can not send request to yourself");
    }
    next();
});

module.exports = mongoose.model('ConnectionRequest', connectionRequestSchema);