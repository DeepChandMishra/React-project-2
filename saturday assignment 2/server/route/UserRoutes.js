const express = require("express");
const userRoute = express.Router();
const info = require('../controller/UserRegistrationController');
const userList = require("../controller/UserList");
const checkToken = require("../middleware/checkToken");
const updateUser = require("../controller/UserUpdateController");
const Login = require("../controller/LoginController");
const UserDeleteController = require("../controller/UserDeleteController");

userRoute.post('/userRegistration', info);
userRoute.get('/search', userList);
userRoute.post('/login', Login);
userRoute.get('/checkToken', checkToken, (req, res) => {
    res.status(200).json({ message: "User profile", user: req.user });
});
userRoute.put('/update/:id', checkToken, updateUser);


userRoute.delete('/delete/:id', checkToken, UserDeleteController);

module.exports = userRoute;
