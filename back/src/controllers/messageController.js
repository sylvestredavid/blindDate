import mongoose from 'mongoose'
import {MessageSchema} from "../models/messageModel";

const Message = mongoose.model('Messages', MessageSchema)

/*
*ajouter un message
*/
export const addMessage = (req, res) => {
    let newMessage = new Message(req.body)

    newMessage.save((err, Message) => {
        if(err) {
            res.send(err)
        }
        res.json(Message)
    })
}

/*
*recuperer tout les messages d'un user
*/
export const getMessagesByUserId = (req, res) => {
    Message.find({$or:[{userFrom: req.params.userId},{userTo: req.params.userId}]}, (err, messages) => {
        if(err) {
            res.send(err)
        }
        res.json(messages)
    })
}

/*
*supprimer un message
*/
export const deleteMessage = (req, res) => {
    Message.remove({ _id: req.params.messageId}, (err) => {
        if (err) {
            res.send(err)
        }
        res.json({message: "Effacer message avec succès"})
    })
}

export const updateMessage = (req, res) => {
    Message.findOneAndUpdate({ _id: req.params.messageId}, req.body, {new: true}, (err, message) => {
        if (err) {
            res.send(err)
        }
        res.json(message)
    })
}
