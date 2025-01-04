const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        // Read the token from the req cookies
        const cookies = req.cookies;

        const { token } = cookies;

        if(!token){
            throw new Error("Token not found");
        }

        // Validate the token

        const decodedData = await jwt.verify(token, "DEV@NoDE030492");
        // Find the user
        const { _id } = decodedData;
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User not found");
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(400).send("ERROR :: " + error.message);
    }


}

module.exports = {
    userAuth
}