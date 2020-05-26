import mongoose from 'mongoose'
import bcrypt from 'bcrypt'


var ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: 'Entre un username'
    },
    password: {
        type: String,
        required: 'Entre un password'
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: 'Entre un email'
    },
    profil: {
        dateDeNaissance: Date,
        description: String,
        chosesAime: [String],
        chosesAimePas: [String],
        localisation: {
            ville: String,
            latitude: Number,
            longitude: Number
        },
        sexe: String,
        lienPhoto: String
    },
    contacts: [ObjectId],
    posts: [{
        type: ObjectId,
        ref: 'Posts'
    }],
    photos: [{
        type: ObjectId,
        ref: 'Photos'
    }],
    smacks: Number,
    recherche: {
        ageMin: Number,
        ageMax: Number,
        sexe: String,
        RayonEnMetres: Number
    }
})

UserSchema.methods.comparePassword = function(mdp) {
    return bcrypt.compareSync(mdp, this.password)
}
