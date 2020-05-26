import cors from 'cors'
import jsonWebToken from 'jsonwebtoken'
import bodyParser from 'body-parser'

export const utils = (app) => {
    //body parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    app.use(cors({
        origin: '*'
    }));

    app.use((req, res, next) => {
        if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0]==='JWT') {
            jsonWebToken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err, decode) => {
                if (err) req.user = undefined
                req.user = decode
                next()
            })
        } else {
            req.user = undefined
            next()
        }
    })
}
