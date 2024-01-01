const { Router } = require("express");
const jwt = require("jsonwebtoken");
const {User,Course} = require("../db/index.js");
const router = Router();
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.create({
        username,
        password
    })
    res.json({ message: 'User created successfully' });
});

router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({
        username,
        password
    })
    const token = jwt.sign({username,password},"mysecret");
    if(user){
        res.json({token:token})
    }
});

router.get('/courses', userMiddleware, async (req, res) => {
    const courses = await Course.find();
    res.json({ courses: courses });
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const user = req.user;

    const courseId = req.params["courseId"];

    const updatedUser = await User.findOneAndUpdate(
        { username:user.username },
        { "$push": { purchasedCourses: courseId } },
        { new: true }
    );

    res.json({ message: 'Course purchased successfully' })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {

    const user = req.user;
    
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });

    res.json({
        courses: courses
    })
});

module.exports = router;