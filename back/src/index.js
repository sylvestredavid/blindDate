import express from 'express'
import mongoose from 'mongoose'
import {publicationRoutes} from './routes/publicationRoutes'
import {userRoutes} from './routes/userRoutes'
import {utils} from "./utils";
import {notificationRoutes} from "./routes/notificationRoutes";
import {messageRoutes} from "./routes/messageRoutes";

const app = express();
const PORT = 3000;

//connexion mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://david:Myriam24@cluster0-gaxim.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

utils(app)

publicationRoutes(app)
userRoutes(app)
notificationRoutes(app)
messageRoutes(app)


app.get('/', (req, res) => {
    res.send("server node et express sur : " +PORT)
})

app.listen(PORT, () =>{
    console.log(`Server listen port ${PORT}`)
    // exec('cd.. && cd front && ng serve');
} )
