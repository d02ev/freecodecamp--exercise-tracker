const UserService = require('../services/UserService');
const UserModel = require('../models/UserSchema');

module.exports = class User {
    static async APICreateUser(req, res, next) {
        try {
            // check if the user already exists
            const existing_user = await UserService.getUserByUserName(req.body.username);
            
            if (existing_user) return res.status(400).send('User Already Exists!');

            // else create the new user
            const new_user = await UserService.createUser(req.body);
            res.json({
                _id: new_user._id,
                username: new_user.username
            });
        }
        catch (err) {
            res.status(500).json({
                error: err
            })
        }
    }

    static async APIGetAllUsers(req, res, next) {
        try {
            const all_users = await UserService.getAllUsers();
            res.json(all_users);
        }
        catch (err) {
            res.status(500).json({
                error: err
            });
        }
    }
}