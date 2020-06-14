import mongoose from 'mongoose'
import {PostSchema, PublicationSchema} from '../models/publicationModel'

const Publication = mongoose.model('Publications', PublicationSchema)

export const addPublication = (req, res) => {
    let newPublication = new Publication(req.body)

    newPublication.save((err, publication) => {
        if(err) {
            res.send(err)
        }
        res.json(publication)
    })
}

/*
*recuperer tout les publications d'un user
*/
export const getPostsByUserId = (req, res) => {
    Publication.find({userId: req.params.userId}, (err, publications) => {
        if(err) {
            res.send(err)
        }
        res.json(publications)
    })
}

/*
*modifier un publication
*/
export const updatePost = (req, res) => {
    Publication.findOneAndUpdate({ _id: req.params.publicationId}, req.body, {new: true}, (err, publication) => {
        if (err) {
            res.send(err)
        }
        res.json(publication)
    })
}

/*
*supprimer un publication
*/
export const deletePost = (req, res) => {
    Publication.remove({ _id: req.params.publicationId}, (err) => {
        if (err) {
            res.send(err)
        }
        res.json({message: "Effacer publication avec succès"})
    })
}
