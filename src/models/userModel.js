import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
export const userSchema = new Schema({
  username: {
    type: String
    //,required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  hashPassword: {
    type: String,
    required: true
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

userSchema.methods.comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};
