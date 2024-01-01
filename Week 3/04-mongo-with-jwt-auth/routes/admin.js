const { Router } = require("express");
const jwt = require("jsonwebtoken");
const {Admin,Course} = require("../db/index.js");
const adminMiddleware = require("../middleware/admin");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await Admin.create({
        username,
        password
    })
    res.json({message:'Admin created successfully'});
});

router.post('/signin', async (req, res) => {
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

router.post('/courses', adminMiddleware, async (req, res) => {
    const course = await Course.create(req.body);
    res.json({ message: 'Course created successfully', courseId: course._id})
});

router.get('/courses', adminMiddleware, async (req, res) => {
    const courses = await Course.find();
    res.json({courses:courses});
});

module.exports = router;