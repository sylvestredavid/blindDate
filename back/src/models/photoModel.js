import mongoose from 'mongoose'


var ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

export const PhotoSchema = new Schema({
    lien: String,
    legend: String,
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
