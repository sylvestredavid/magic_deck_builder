import mongoose from 'mongoose'
import { UserSchema } from "../models/userModel";
import bcrypt from 'bcrypt'

var jwt = require('jsonwebtoken')

const User = mongoose.model('Users', UserSchema)

/*
*enregistrer un nouvel utilisateur
*/
export const register = (req, res) => {
    let newUser = new User(req.body)
    newUser.password = bcrypt.hashSync(req.body.password, 10)

    newUser.save((err, user) => {
        if (err) {
            res.send(err)
        }
        res.json(user)
    })
}

/*
*se connecter
*/
export const sign_in = function(req, res) {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err;
      if (!user) {
        res.status(401).json({ message: 'Authentication failed. User not found.' });
      } else if (user) {
        if (!user.comparePassword(req.body.password)) {
          res.status(401).json({ message: 'Authentication failed. Wrong password.' });
        } else {
          return res.json({token: jwt.sign({ userName: user.userName, _id: user._id}, 'RESTFULAPIs')});
        }
      }
    });
  };


/*
*modifier un utilisateur
*/
export const updateUser = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.userId}, req.body, {new: true}, (err, user) => {
        if (err) {
            res.send(err)
        }
        res.json(user)
    })
}


/*
*fonction qui bloque l'accès aux personnes non connectés
*/
export const loginRequired = function(req, res, next) {
    if (req.user) {
      next();
    } else {
      return res.status(401).json({ message: 'Unauthorized user!' });
    }
  };


/*
*fonction qui vérifie si l'username existe deja dans la bdd
*/
  export const existByName = (req, res) => {
    User.count({username: req.params.name}, (err, count) => {
      if(err) {
        res.send(err)
      } else {
        if(count === 0){
          res.send({usernameExist: false})
        } else {
          res.send({usernameExist: true})
        }
      }
    })
  }
