const express = require('express');
/* const {isAuth} =require("../../middlewares/auth.middlewares")
const {isAdmin} = require('../../middlewares/admin.middlewares') */


const UsersRoutes = express.Router();
const { registerUser, loginUser, getAllUsers } = require('../controllers/users.controllers');

UsersRoutes.post('/register', registerUser);
UsersRoutes.post('/login', loginUser);
UsersRoutes.get('/users',getAllUsers);

module.exports = UsersRoutes;
