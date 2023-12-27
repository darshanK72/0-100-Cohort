const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    const username = req.headers["username"];
    const password = req.headers["password"];
    const user = await User.create({
        username,
        password
    })
    res.json({message:'User created successfully'});
});

router.get('/courses', async (req, res) => {
    const courses = await Course.find();
    res.json({courses:courses});
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const course = await User.findByIdAndUpdate(req.params.courseId,{courseId:req.params.courseId});
    res.json( { message: 'Course purchased successfully'})
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
   
});

module.exports = router;