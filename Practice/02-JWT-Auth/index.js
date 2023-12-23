const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();

app.use(express.json());

const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
  {
    username:"darshan@gmail.com",
    password:"darshan@123",
    name:"Darshan Khairnar"
  }
];

function userExists(username, password) {
  const user = ALL_USERS.find(u => u.username == username && u.password == password);
  if(user) return true;
  else return false;
}

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  let token = req.headers.authorization;
  console.log(token.substring(7));
  token = token.substring(7);
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    console.log(username);
    res.json(ALL_USERS.filter(u => u.username != username));
  } catch (err) {
    res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000)