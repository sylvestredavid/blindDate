import mongoose from 'mongoose'
import { PostSchema } from '../models/postModel'

const Post = mongoose.model('Posts', PostSchema)

/*
*ajouter un post
*/
export const addPost = (req, res) => {
    let newPost = new Post(req.body)

    newPost.save((err, post) => {
        if(err) {
            res.send(err)
        }
        res.json(post)
    })
}

/*
*recuperer tout les posts d'un user
*/
export const getPostsByUserId = (req, res) => {
    Post.find({userId: req.params.userId}, (err, posts) => {
        if(err) {
            res.send(err)
        }
        res.json(posts)
    })
}

/*
*modifier un post
*/
export const updatePost = (req, res) => {
    Post.findOneAndUpdate({ _id: req.params.postId}, req.body, {new: true}, (err, post) => {
        if (err) {
            res.send(err)
        }
        res.json(post)
    })
}

/*
*supprimer un post
*/
export const deletePost = (req, res) => {
    Post.remove({ _id: req.params.postId}, (err) => {
        if (err) {
            res.send(err)
        }
        res.json({message: "Effacer post avec succès"})
    })
}
