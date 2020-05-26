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

function userMap(user) {
    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        profil: user.profil,
        contacts: user.contacts,
        posts: user.posts,
        photos: user.photos,
        smacks: user.smacks,
        recherche: user.recherche
    };
}

/*
*se connecter
*/
export const sign_in = function(req, res) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
      if (err) throw err;
      if (!user) {
        res.status(401).json({ message: 'Utilisateur inconnu.' });
      } else if (user) {
        if (!user.comparePassword(req.body.password)) {
          res.status(401).json({ message: 'utilisateur ou mot de passe incorrect.' });
        } else {
            const userReturn = userMap(user)
          return res.json({token: jwt.sign(userReturn, 'RESTFULAPIs')});
        }
      }
    });
  };


/*
*recuperer tout les utilisateurs
*/
export const getUsers = (req, res) => {
    User.find({}).populate('posts').populate('photos').exec((err, users) => {
        if (err) {
            res.send(err)
        }
        let usersReturn = [];
        users.forEach(u => usersReturn.push(userMap(u)))
        res.json(usersReturn)
    })
}


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
 * récuperer un user
 */
export const getUsertWithId = (req, res) => {
  User.find(req.params.userId).populate('posts').populate('photos').exec((err, user) => {
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
    // if (req.user) {
    //   next();
    // } else {
    //   return res.status(401).json({ message: 'Unauthorized user!' });
    // }
    next()
  };


/*
*fonction qui vérifie si l'email existe deja dans la bdd
*/
  export const existByEmail = (req, res) => {
    User.count({email: req.params.email}, (err, count) => {
      if(err) {
        res.send(err)
      } else {
        if(count === 0){
          res.send({emailExist: false})
        } else {
          res.send({emailExist: true})
        }
      }
    })
  }


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
