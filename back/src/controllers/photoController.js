import mongoose from 'mongoose'
import { PhotoSchema } from '../models/photoModel'

const Photo = mongoose.model('Photos', PhotoSchema)

/*
*ajouter une photo
*/
export const addPhoto = (req, res) => {
    let newPhoto = new Photo(req.body)

    newPhoto.save((err, photo) => {
        if(err) {
            res.send(err)
        }
        res.json(photo)
    })
}

/*
*recuperer les photos d'un user
*/
export const getPhotoByUserId = (req, res) => {
    Photo.find({userId: req.params.userId}, (err, photos) => {
        if(err) {
            res.send(err)
        }
        res.json(photos)
    })
}

/*
*modifier une photo
*/
export const updatePhoto = (req, res) => {
    Photo.findOneAndUpdate({ _id: req.params.photoId}, req.body, {new: true}, (err, photo) => {
        if (err) {
            res.send(err)
        }
        res.json(photo)
    })
}

/*
*supprimer une photo
*/
export const deletePhoto = (req, res) => {
    Post.remove({ _id: req.params.photoId}, (err) => {
        if (err) {
            res.send(err)
        }
        res.json({message: "Effacer photo avec succès"})
    })
}
