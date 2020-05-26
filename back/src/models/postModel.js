import mongoose from 'mongoose'


var ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

export const PostSchema = new Schema({
    date: {
        type: Date,

    },
    contenu: String,
    likes: [ObjectId],
    commentaires: [
        {
            userId:{
                type: ObjectId,
                required: 'Entrez un user id'
            },
            contenu: String
        }
    ],
    userId: ObjectId
})
