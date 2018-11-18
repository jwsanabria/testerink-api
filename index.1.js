// Imports
let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');
const Busboy = require('busboy');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const BUCKET_NAME = process.env.AWS_S3_BUCKET;
const IAM_USER_KEY = process.env.AWS_ACCESS_KEY_ID;
const IAM_USER_SECRET = process.env.AWS_SECRET_ACCESS_KEY;
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


  
  
  function uploadToS3(file, filename) {
    let s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
      Bucket: BUCKET_NAME
    });
    s3bucket.createBucket(function () {
        var params = {
          Bucket: BUCKET_NAME,
          Key: filename,
          Body: file.data
        };
        s3bucket.upload(params, function (err, data) {
          if (err) {
            console.log('error in callback');
            console.log(err);
          }
          console.log('success');
          console.log(data);
        });
    });
  }


  app.post('/api/upload', function (req, res, next) {
    // This grabs the additional parameters so in this case passing in
    // "element1" with a value.
    const element1 = req.body.filename;
    var busboy = new Busboy({ headers: req.headers });

    // The file upload has completed
    busboy.on('finish', function() {
      console.log('Upload finished');
      
      // Your files are stored in req.files. In this case,
      // you only have one and it's req.files.element2:
      // This returns:
      // {
      //    element2: {
      //      data: ...contents of the file...,
      //      name: 'Example.jpg',
      //      encoding: '7bit',
      //      mimetype: 'image/png',
      //      truncated: false,
      //      size: 959480
      //    }
      // }
      
      // Grabs your file object from the request.
      const file = req.files.file;
      console.log(file);
      
      // Begins the upload to the AWS S3
      uploadToS3(file, req.body.filename);
    });

    req.pipe(busboy);
  });
  
// Use Api routes in the App
app.use('/api', apiRoutes)
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});
