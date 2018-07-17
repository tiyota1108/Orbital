var express =require('express');
var bodyParser = require('body-parser');
var path = require('path');
import mongoose from 'mongoose';
import routes from './src/routes/1564routes';//here you cannot use require



var app = express();
var PORT = 8080;

//mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

//app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json()); //let the body parser know that we expect json to be coming in with http requests to the server
app.use(bodyParser.urlencoded({extended: true}))

routes(app);

var server = app.listen(process.env.PORT ||8080
  ,()=>{
  console.log("server is listening on port" + server.address().port);
})
