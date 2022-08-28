const ExerciseModel = require('../models/ExerciseSchema');

module.exports = class ExerciseService {
    static async createExercise(creationData) {
        try {
            const new_exercise = {
                user_id: creationData.user_id,
                username: creationData.username,
                description: creationData.description,
                duration: creationData.duration,
                date: creationData.date
            };

            const response = await new ExerciseModel(new_exercise).save();
            return response;
        }
        catch (err) {
            console.error(err);
        }
    }
}