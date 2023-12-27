// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    const user = await Admin.findOne({ username, password });

    if (user) {
        next();
    }
}

module.exports = adminMiddleware;