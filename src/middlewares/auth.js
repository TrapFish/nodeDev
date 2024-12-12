const authAdmin = (req, res, next) => {
    console.log("Admin auth is getting checked !!");
    const token = "xyz";
    const isAdminAutherized = token === "xyz";
    if(!isAdminAutherized) {
        res.status(401).send("Unauthorised request");
    } else {
        next();
    }
}

const authUser = (req, res, next) => {
    console.log("Admin auth is getting checked !!");
    const token = "xyz";
    const isAdminAutherized = token === "xyz";
    if(!isAdminAutherized) {
        res.status(401).send("Unauthorised request");
    } else {
        next();
    }
}

module.exports = {
    authAdmin,
    authUser
}