const Express = require('express');
const CORS = require('cors');
const UserModel = require('./models/UserSchema');
const ExerciseModel = require('./models/ExerciseSchema');
const LogModel = require('./models/LogSchema');
require('dotenv').config()
require('./config/db.config').connectDB();

const App = Express();

App.use(CORS());
App.use(Express.urlencoded(
    {
        extended: false
    }
));
App.use(Express.json());
App.use(Express.static('public'));

App.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});

// saving a user in the database
App.post('/api/users', (req, res) => {
    const user_obj = new UserModel({
        username: req.body.username
    });

    user_obj.save((err, new_user) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        }
        else {
            res.json(new_user);
        }
    });
});

// get all users
App.get('/api/users', (req, res) => {
    UserModel.find((err, all_users) => {
        if (err) {
            res.status(500).json({
                error: err.message
            })
        }
        else {
            res.json(all_users);
        }
    });
});

// save exercises for the specified user
App.post('/api/users/:_id/exercises', (req, res) => {
    const user_id = req.params._id;

    UserModel.findById(user_id, (err, user) => {
        if (err) {
            res.status(404).send('User Not Found!');
        }
        else {
            const user_by_id = user;
            let date;

            if (req.body.date === "") date = new Date(Date.now()).toDateString();
            else date = new Date(req.body.date).toDateString();

            const exercise_obj = new ExerciseModel({
                user_id: user_id,
                username: user_by_id.username,
                description: req.body.description,
                duration: req.body.duration,
                date: date
            });

            exercise_obj.save((err, new_exercise) => {
                if (err) {
                    res.status(500).json({
                        error: err.message
                    })
                }
                else {
                    LogModel.findById(new_exercise.user_id, (err, log) => {
                        let new_count = 0, old_count = 0;

                        if (err) {
                            ++new_count;

                            const log_obj = new LogModel({
                                _id: new_exercise.user_id,
                                username: new_exercise.username,
                                count: 0,
                                log: [{
                                    description: new_exercise.description,
                                    duration: new_exercise.duration,
                                    date: new_exercise.date
                                }]
                            });

                            log_obj.save((err, new_log) => {
                                if (err) {
                                    res.status(400).send('Bad Request Cannot Create Log!');
                                }
                            })
                        }
                        else {
                            LogModel.findByIdAndUpdate(new_exercise.user_id, {
                                description: new_exercise.description,
                                duration: new_exercise.duration,
                                date: new_exercise.date
                            }, (err, updated_log) => {
                                if (err) {
                                    res.json(400).send('Unable To Update. Bad Request!');
                                }
                            });
                        }
                    });

                    res.json(new_exercise);
                }
            });
        }
    });
});

const CONN_PORT = process.env.PORT || 3358;
App.listen(CONN_PORT,
    () => console.log(`Your App is Listening at http://localhost:${CONN_PORT}`)
);