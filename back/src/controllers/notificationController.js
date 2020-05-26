import mongoose from 'mongoose'
import {NotificationSchema} from "../models/notificationModel";

const Notification = mongoose.model('Notifications', NotificationSchema)

/*
*ajouter une notification
*/
export const addNotification = (req, res) => {
    let newNotification = new Notification(req.body)

    newNotification.save((err, notification) => {
        if(err) {
            res.send(err)
        }
        res.json(notification)
    })
}

/*
*recuperer toutes les notifications d'un user
*/
export const getNotificationByUserId = (req, res) => {
    Notification.find({userId: req.params.userId}, (err, notifications) => {
        if(err) {
            res.send(err)
        }
        res.json(notifications)
    })
}

/*
*modifier une notification
*/
export const updateNotification = (req, res) => {
    Notification.findOneAndUpdate({ _id: req.params.notificationId}, req.body, {new: true}, (err, notification) => {
        if (err) {
            res.send(err)
        }
        res.json(notification)
    })
}
