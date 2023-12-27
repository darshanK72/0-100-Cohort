const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://rootuser:darshan%40123@cluster0.unypygq.mongodb.net/udemy')
    .then((conn) => {
        console.log("Mongodb Connected" ,conn);
    });

const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}