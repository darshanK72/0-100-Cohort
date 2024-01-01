const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

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

router.get('/courses', async (req, res) => {
    const courses = await Course.find();
    res.json({ courses: courses });
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const username = req.user.username;
    const courseId = req.params["courseId"];

    const user = await User.findOne(
        { username },
        { $push: { purchasedCourses: courseId } },
        { new: true }
    );

    res.json({ message: 'Course purchased successfully' })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const username = req.user.username;

    const user = await User.find({username});

    const courses = await Course.find({
        _id: {
            $in: user.purchasedCourses
        }
    })

    res.json({
        purchasedCourses: courses
    })
});

module.exports = router;