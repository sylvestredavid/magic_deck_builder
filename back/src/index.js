import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import {deckRoutes} from './routes/deckRoutes'
import {userRoutes} from './routes/userRoutes'


var cors = require('cors');

var jsonWebToken = require('jsonwebtoken')

const app = express();
const PORT = 3000;

//connexion mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/magicDeckBuilderdb', {
    useNewUrlParser: true
})

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

deckRoutes(app)
userRoutes(app)

app.use(express.static('../public'))

app.get('/', (req, res) => {
    res.send("server node et express sur : " +PORT)
})

app.listen(PORT, () => console.log(`Server listen port ${PORT}`))
