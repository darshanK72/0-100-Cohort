const jwt = require("jsonwebtoken");
const {Admin} = require("../db/index.js");

async function adminMiddleware(req, res, next) {
    let token = req.headers["authorization"];
    // console.log(token);
    // console.log(req.headers);
    token = token.split(' ')[1];

    const decodedToken = jwt.decode(token);

    const username = decodedToken.username;
    const password = decodedToken.password;

    const user = await Admin.findOne({ username, password });

    if (user) {
        req.user = user;
        next();
    }
}

module.exports = adminMiddleware;