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

module.exports = mongoose.model('ConnectionRequest', connectionRequestSchema);