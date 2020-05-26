import mongoose from 'mongoose'


var ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

export const NotificationSchema = new Schema({
    message: String,
    userId: ObjectId,
    date: Date,
    vu: Boolean,
})
