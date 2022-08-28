const UserModel = require('../models/UserSchema');

module.exports = class UserService {
    static async createUser(creationData) {
        try {
            const new_user = {
                username: creationData.username
            }

            const response = await new UserModel(new_user).save();
            return response;
        }
        catch (err) {
            console.error(err);
        }
    }

    static async getAllUsers() {
        try {
           const all_users = await UserModel.find();
           return all_users;
        }
        catch (err) {
            console.error(err);
        }
    }

    static async getUserByUserName(userName) {
        try {
            const user_by_name = await UserModel.findOne({ username: userName });
            return user_by_name;
        }
        catch (err) {
            console.error(err);
        }
    }

    static async getUserByID(userID) {
        try {
            const user_by_id = await UserModel.findById(userID);
            return user_by_id;
        }
        catch (err) {
            console.error(err);
        }
    }
}