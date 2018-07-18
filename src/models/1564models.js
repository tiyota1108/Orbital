import mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const cardSchema = new Schema({
  cardContent: {
    type: String
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

export const noteSchema = new Schema({
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
