import express from 'express'
import mongoose from 'mongoose'
import {postRoutes} from './routes/postRoutes'
import {userRoutes} from './routes/userRoutes'
import {photoRoutes} from "./routes/photoRoutes";
import {utils} from "./utils";
import {notificationRoutes} from "./routes/notificationRoutes";
import {messageRoutes} from "./routes/messageRoutes";

const app = express();
const PORT = 3000;

//connexion mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/speedLovebd', {
    useNewUrlParser: true
})

utils(app)

postRoutes(app)
userRoutes(app)
photoRoutes(app)
notificationRoutes(app)
messageRoutes(app)


app.get('/', (req, res) => {
    res.send("server node et express sur : " +PORT)
})

app.listen(PORT, () => console.log(`Server listen port ${PORT}`))
