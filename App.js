const Express = require('express');
const CORS = require('cors');
require('dotenv').config()

const App = Express();

App.use(CORS());
App.use(Express.static('public'));

App.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});

const CONN_PORT = process.env.PORT || 3358;
App.listen(CONN_PORT,
    () => console.log(`Your App is Listening at http://localhost:${CONN_PORT}`)
);