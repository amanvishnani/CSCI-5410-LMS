const serverless = require('serverless-http')
const express = require('express')
const cors = require('cors')
var bodyParser = require('body-parser');
const { signIn, createChallenge } = require('./AuthService');

let app = express()

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/login', async (req, res, next) => {
    let { emailId, password } = req.body
    try {
        let resp = await signIn(emailId, password)
        let userId = resp.user.uid;
        let challange = await createChallenge(userId);
        res.send(challange)
    } catch (error) {
        res.status(401)
        res.send(error)
    }
})

exports.lambdaHandler = serverless(app)
