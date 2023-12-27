const { Router } = require("express");
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middleware/admin");
const router = Router();

// Admin Routes
app.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await Admin.create({
        username,
        password
    })
    res.json({message:'Admin created successfully'});
});

app.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await Admin.findOne({
        username,
        password
    })
    const token = jwt.sign({username,password},"mysecret");
    if(user){
        res.json({token:token})
    }
});

app.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
});

app.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;