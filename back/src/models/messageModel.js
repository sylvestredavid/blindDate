import mongoose from 'mongoose'


var ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

export const MessageSchema = new Schema({
    message: String,
    userFrom: ObjectId,
    userTo: ObjectId,
    date: Date,
    vu: Boolean,
})
