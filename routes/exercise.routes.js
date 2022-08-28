const Route = require('express').Router();
const ExerciseController = require('../controllers/exercise.controllers');

Route.post('/:_id/exercises', ExerciseController.APICreateExercise);

module.exports = Route;