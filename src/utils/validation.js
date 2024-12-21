var validator = require('validator');

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password, age, gender } = req.body;
    if (!firstName || !lastName) {
        throw new Error("Name is not Valid !");
    }
    else if (firstName.length < 4 && firstName.length > 58) {
        throw new Error("Firname length should be between 4 to 50 character");
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid");
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Please eneter a strng password")
    }
    else if (age < 18) {
        throw new Error("It is an invaid Age")
    }
    else if (!["male", "female", "others"].includes(gender)) {
        throw new Error("Please enter the valid gender")
    }
}

module.exports = { validateSignUpData }