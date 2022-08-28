const Route = require('express').Router();
const UserController = require('../controllers/user.controllers');

// adding a new user
Route.post('/', UserController.APICreateUser);

// get all users
Route.get('/', UserController.APIGetAllUsers);

module.exports = Route;