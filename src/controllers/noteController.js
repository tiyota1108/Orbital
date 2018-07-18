import mongoose from 'mongoose';
import {noteSchema, cardSchema} from '../models/1564models';

export const Note = mongoose.model('Note', noteSchema);

export const addNewNote = (req, res) => {
  let newNote = new Note(req.body);

  newNote.save((err, note) => {
    if (err) {
      res.send(err);
    }
    res.json(note);
  });
};

export const getNotes = (req, res) => {
  Note.find({}, (err, notes) => {
    if (err) {
      res.send(err);
    }
    res.json(notes);
  });
};

export const getNoteWithId = (req, res) => {
  Note.findById(req.params.noteId, (error, note) => {
    if (err) {
      res.send(err);
    }
    res.json(note);
  });
};//i'll just leave it here first, might not use it

export const updateNote = (req, res) => {
  //console.log(typeof req.params.noteId)
  Note.findOneAndUpdate({_id : req.params.noteId},//or {_id: req.params.noteId}
req.body, {new : true}, (err, note) => { //the new option tells it to return the updated one
  if (err) {
    res.send(err);
  }
  res.json(note);
});
};

export const deleteNote = (req, res) => {
  Note.remove({_id: req.params.noteId}, (err, note) => {
  if (err) {
    res.send(err);
  }
  res.json({message: 'delete successful'});
});
};
