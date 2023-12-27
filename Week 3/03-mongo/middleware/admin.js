const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    const username = req.headers["username"];
    const password = req.headers["password"];

    const user = await Admin.findOne({ username, password });

    if (user) {
        next();
    }
}

module.exports = adminMiddleware;