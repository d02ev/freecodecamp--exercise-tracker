const Express = require('express');
const CORS = require('cors');
const UserRoute = require('./routes/user.routes');
const ExerciseRoute = require('./routes/exercise.routes');
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

App.use('/api/users', UserRoute);
App.use('/api/users', ExerciseRoute);

App.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});

const CONN_PORT = process.env.PORT || 3358;
App.listen(CONN_PORT,
    () => console.log(`Your App is Listening at http://localhost:${CONN_PORT}`)
);