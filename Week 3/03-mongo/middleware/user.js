const { User } = require("../db");

async function userMiddleware(req, res, next) {
    
    const username = req.headers["username"];
    const password = req.headers["password"];

    const user = await User.findOne({ username, password });
    if (user) {
        req.user = user;
        next();
    }
}

module.exports = userMiddleware;