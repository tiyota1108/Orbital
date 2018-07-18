import mongoose from 'mongoose';
import {cardSchema} from '../models/1564models';
import { Note } from './noteController'

export const addNewCard = (req, res) => {
  Note.findById(req.params.noteId, (error, parentNote) => {
    if(error) {
      res.send(err);
    }
    var newCard = parentNote.cards.create(req.body);
    parentNote.cards.push(newCard);
    parentNote.save((err, note) => {
        if(err) {
          res.send(err);
        }
        res.json(newCard);
    })
  });
}

export const getCards = (req, res) => {
  Note.findById(req.params.noteId, (error, parentNote) => {
    if(error) {
      res.send(err);
    }
    res.json(parentNote.cards);
  });
};

export const getCardWithId = (req, res) => {
  Note.findById(req.params.noteId, (error, parentNote) => {
    if (error) {
      res.send(err);
    }
    var card = parentNote.cards.id(req.params.cardId);
    res.json(card);
  });
};//i'll just leave it here first, might not use it

export const updateCard = (req, res) => {
  Note.findById(req.params.noteId, (error, parentNote) => {
    if (error) {
      res.send(err);
    }
    var newCard = parentNote.cards.id(req.params.cardId).set(req.body);
    parentNote.save((err, note) => {
        if(err) {
          res.send(err);
        }
        res.json(newCard);
    });
});
}

export const deleteCard = (req, res) => {
  Note.findById(req.params.noteId, (error, parentNote) => {
    if (error) {
      res.send(err);
    }
    parentNote.cards.id(req.params.cardId).remove();
    parentNote.save((err, note) => {
        if(err) {
          res.send(err);
        }
        res.json({message : 'delete successful'});
    });
});
};
