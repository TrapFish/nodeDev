const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const connectionRequestSchema = new Schema({
   fromUserId: {
       type: Schema.Types.ObjectId,
       required: true,
   },
   toUserId :{
         type: Schema.Types.ObjectId,
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