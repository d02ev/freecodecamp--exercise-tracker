const ExerciseService = require('../services/ExerciseService');
const UserService = require('../services/UserService');
const ExerciseModel = require('../models/ExerciseSchema');

module.exports = class Exercise {
    static async APICreateExercise(req, res, next) {
        try {
            const user_id = req.params._id;
            const user_by_id = await UserService.getUserByID(user_id);
            let date;

            // if no date is provided by the user
            if (req.body.date === "") {
                date = new Date(Date.now()).toDateString();
            }
            else {
                date = new Date(req.body.date).toDateString();
            }

            const creation_data = {
                user_id: user_id,
                username: user_by_id.username,
                description: req.body.description,
                duration: req.body.duration,
                date: date
            }

            const new_exercise = await ExerciseService.createExercise(creation_data);
            res.json({
                _id: new_exercise.user_id,
                username: new_exercise.username,
                description: new_exercise.description,
                duration: new_exercise.duration,
                date: date
            });
        }
        catch (err) {
            res.status(500).json({
                error: err
            })
        }
    }
}