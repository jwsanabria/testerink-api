// Imports
let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
const Busboy = require('busboy');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const USER_MONGO_DB = process.env.MONGODB_USER;
const PASSWORD_MONGO_DB = process.env.MONGODB_PASSWORD;

// Import routes
let apiRoutes = require("./api-routes")

// Initialize the app
let app = express();
app.use(cors());

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));

// Connect to Mongoose and set connection variable
//mongoose.connect('mongodb://localhost:27017/testerinktool');
mongoose.connect('mongodb://'+USER_MONGO_DB+':'+PASSWORD_MONGO_DB+'@ds063439.mlab.com:63439/testerinktool');
var db = mongoose.connection;
// Setup server port
var port = process.env.PORT || 8080;
// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes)
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});