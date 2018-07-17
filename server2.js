var express =require('express');
var bodyParser = require('body-parser');
var path = require('path');


var app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json()); //let the body parser know that we expect json to be coming in with http requests to the server
//app.use(bodyParser.urlencoded({extended: false}))

var messages = []

app.post('/note', (req, res) =>{
    console.log(req.body);
    var comingReq = req.body;
    if(comingReq.noteFlag === "note"){
      if(comingReq.methodFlag ==="add"){
        messages.push({
          id : comingReq.id,
          note: comingReq.note,
          cards: comingReq.cards,
        });
      } else if(comingReq.methodFlag ==="update"){
        var index = messages.findIndex((note) => comingReq.id === note.id);
        messages[index].note = comingReq.note;
      } else {
        var index = messages.findIndex((note) => comingReq.id === note.id);
        messages[index].id = -1;
        //messages.splice(index, 1);
      }
    } else {
      var noteIndex = messages.findIndex((note) => comingReq.noteId === note.id);
      var cardsArray = messages[noteIndex].cards; //can i use variable
      if(comingReq.methodFlag ==="add"){
        cardsArray.push({
          id : comingReq.id,
          card: comingReq.card,
        });
      } else if(comingReq.methodFlag ==="update"){
        var index = cardsArray.findIndex((note) => comingReq.id === note.id);
        cardsArray[index].card = comingReq.card;
      } else {
        var index = cardsArray.findIndex((note) => comingReq.id === note.id);
        cardsArray[index].id = -1;
        //cardsArray.splice(index, 1);
      }
    }
    res.sendStatus(200);
    console.log("now the messages contains" + messages);
})//post send stuff to the server




app.get('/note', (req,res) =>{
  console.log("getting message from server");
  console.log(messages);
  res.send(messages);
}) //get is when server feed data back to front end
var server = app.listen(process.env.PORT ||8080
  ,()=>{
  console.log("server is listening on port" + server.address().port);
})

//app.listen(process.env.PORT || 8080);

// fetch('http://localhost:3000/note', {
//   method: 'POST',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     id: 'yourValue',
//     note: 'yourOtherValue',
//   })
// })



// const express = require('express');
// const bodyParser = require('body-parser')
// const path = require('path');
// const app = express();
// app.use(express.static(path.join(__dirname, 'build')));
//
// app.get('/ping', function (req, res) {
//  return res.send('pong');
// });
//
// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
//
// app.listen(process.env.PORT || 8080);



// app.post('/note', (req, res) =>{
//     console.log(req.body);
//     var comingNote = req.body;
//     if(comingNote.note === "byebye"){
//       var index = messages.findIndex((note) => comingNote.id === note.id);
//       messages.splice(index, 1);
//     }else{
//     var is_new = true;
//     messages.forEach((note)=>{
//       if(note.id === comingNote.id){
//         is_new = false;
//         note.note = comingNote.note;
//       }
//     })
//     if(is_new === true){
//       messages.push(req.body);
//     }
//   }
//     res.sendStatus(200);
//
// })//post send stuff to the server
