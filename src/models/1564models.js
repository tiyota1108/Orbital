import mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const cardSchema = new Schema({
  cardId: {
    type: Number,
    required : 'provide cardId'
  },
  cardContent: {
    type: String
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

export const noteSchema = new Schema({
  noteId : {
    type : Number,
    required : 'provide noteId'
  },
  noteTitle: {
    type: String
  },
  cards : {
    type: [cardSchema],
    default: []
  },
  created_date: {
    type: Date,
    default: Date.now //this is just a demonstration of using default
  }
});

//export default noteSchema;
