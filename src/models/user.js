const mongoose = require("mongoose");
var validator = require('validator');

const userSchema = new mongoose.Schema({
        firstName: {
                type: String,
                required: true,
                minLength: 4,
                maxLength: 58,
        },
        lastName: {
                type: String,
        },
        emailId: {
                type: String,
                lowercase: true,
                required: true,
                unique: true,
                trim: true,
                validate(value){
                        if(!validator.isEmail(value)){
                                throw new Error("Invalid Email Address  " + value);
                        }
                }
        },
        password: {
                type: String,
                required: true,
                validate(value){
                        if(!validator.isStrongPassword(value)){
                                throw new Error("Enter strong password   " + value);
                        }
                }
        },
        age: {
                type: Number,
                min: 18,
        },
        gender: {
                type: String,
                validate(value) {
                        if (!["male", "female", "others"].includes(value)) {
                                throw new Error("Gender data is not valid");
                        }
                }
        },
        photoUrl: {
                type: String,
                default: 'https://avatars.githubusercontent.com/u/59255732?v=4',
                validate(value){
                        if(!validator.isURL(value)){
                                throw new Error("Invalid Photo URL  " + value);
                        }
                }
        },
        about: {
                type: String,
                default: "This is a default about the user",
        },
        skills: {
                type: [String],
                default: ["JavaScript", "Rocket", "Coding"]
        }
},
        {
                timestamps: true,
        });

const User = mongoose.model("User", userSchema);

module.exports = User;