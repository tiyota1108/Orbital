import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userSchema } from '../models/userModel';
import { secret } from '../../config'

export const User = mongoose.model('User', userSchema);

export const register = (req, res) => {
  const newUser = new User(req.body);
  newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
  newUser.save((err, user) => {
    if(err) {
      return res.status(400).send( {
        message: err
      });
    } else {
      user.hashPassword = undefined;
      return res.json(user);
    }
  })
}

export const login = (req, res) => {
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if(err) throw err;
    if(!user) {
      res.status(401).json({message: "Authentication failed. No user found!"});
    } else {
      if(!user.comparePassword(req.body.password, user.hashPassword)) {
        res.status(401).json({message: "Authentication failed. Wrong password!"});
      } else {
        res.json({
          token: jwt.sign({email: user.email, username: user.username,
        _id: user._id}, secret),
      id: user._id
    });
      }
    }
  });
}

export const loginRequired = (req, res, next) => {
  if(req.user) {
    next();
  } else {
    //console.log("we are here in loginRequired");
    return res.status(401).json({message: "Unauthorized user,please login."});
  }
}
