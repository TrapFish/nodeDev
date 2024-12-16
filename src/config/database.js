const mongoose = require("mongoose");


const connectDb = async () => {

    //mongodb+srv://gourav:April123456789@cluster0.t7vfltz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/nodeDevTinder
    await mongoose.connect(
        "mongodb+srv://gourav:April123456789@cluster0.t7vfltz.mongodb.net/nodeDevTinder"
    );
}

module.exports = connectDb;