const Express = require('express');
const BodyParser = require('body-parser');
const CORS = require('cors');
require('dotenv').config()
require('./config/db.config').connectDB();

const App = Express();

App.use(CORS());
App.use(BodyParser.urlencoded(
    {
        extended: true
    }
));
App.use(BodyParser.json());
App.use(Express.static('public'));

App.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});

const CONN_PORT = process.env.PORT || 3358;
App.listen(CONN_PORT,
    () => console.log(`Your App is Listening at http://localhost:${CONN_PORT}`)
);