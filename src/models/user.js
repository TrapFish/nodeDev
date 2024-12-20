const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
        firstName: {
                type: String,
                required: true,
        },
        lastName: {
                type: String,
        },
        emailId: {
                type: String,
                lowercase: true,
                required: true,
                unique: true,
                trim: true
        },
        password: {
                type: String,
                required: true,
        },
        age: {
                type: Number,
        },
        gender: {
                type: String,
        },
        photoUrl: {
                type: String,
                default: 'https://avatars.githubusercontent.com/u/59255732?v=4',
        },
        about: {
                type: String,
                default: "This is a default about the user",
        },
        skills: {
                type: [String],
        }
});

const User = mongoose.model("User", userSchema);

module.exports = User;