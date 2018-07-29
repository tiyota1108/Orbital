var express =require('express');
var {createServer} = require('http');
var cors = require('cors');//add in cors
var bodyParser = require('body-parser');
var path = require('path');
import mongoose from 'mongoose';
import routes from './src/routes/1564routes';//here you cannot use require
import { mongoUri, secret } from './config';
import jsonwebtoken from 'jsonwebtoken';
import User from './src/models/userModel'; //i'm pretty sure this is wrong
//nodemon ./server.js --exec babel-node -e js &&


var app = express();
var PORT = 8080;
console.log("before mongo");
//mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(mongoUri, { useNewUrlParser: true });
console.log("after mongo");

// app.use(cors());
app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.json()); //let the body parser know that we expect json to be coming in with http requests to the server
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
  if(req.headers && req.headers.authorization
    && req.headers.authorization.split(' ')[0] === 'JWT') {
      jsonwebtoken.verify(req.headers.authorization.split(' ')[1], secret,
    (err, decode) => {
      if(err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});
routes(app);
var server = createServer(app);
server.listen(process.env.PORT ||8080
  ,()=>{
  console.log("server is listening on port" + server.address().port);
})
// var server = app.listen(process.env.PORT ||8080
//   ,()=>{
//   console.log("server is listening on port" + server.address().port);
// })
