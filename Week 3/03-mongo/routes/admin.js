const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Course, Admin } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    const username = req.headers["username"];
    const password = req.headers["password"];
    const user = await Admin.create({
        username,
        password
    })
    res.json({message:'Admin created successfully'});
});

router.post('/courses', adminMiddleware, async (req, res) => {
    const course = await Course.create(req.body);
    res.json({ message: 'Course created successfully', courseId: course._id})
});

router.get('/courses', adminMiddleware,async (req, res) => {
    const courses = await Course.find();
    res.json({courses:courses});
});

module.exports = router;