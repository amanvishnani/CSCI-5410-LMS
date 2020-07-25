const serverless = require('serverless-http')
const express = require('express')
const cors = require('cors')
var bodyParser = require('body-parser');
const AuthService = require('./AuthService');
const OnlineUsers = require('./model/OnlineUsers');

let app = express()

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(async function (req, res, next) {
    let token = req.headers.authorization
    if(token) {
        let decodedToken = await AuthService.verifyToken(token)
        req.token = decodedToken
        next()
    } else {
        next()
    }
})

app.post('/session/validate-challenge', async (req, res, next) => {
    let { challengeCode, challengeResponse } = req.body
    try {
        // 1. Find challenge
        let challenge = await AuthService.findChallenge(challengeCode)
        // 2. Verify Challenge
        await AuthService.verifyChallenge(challenge.userId, challengeResponse)
        // 3. Mint Token && Read User Object
        let package = await AuthService.mintToken(challenge.userId)
        // 4. Delete Challenge
        // @TODO: Not important for Demo
        // 5. Set online status.
        let {user, org} = package;
        await AuthService.setOnlineStatus(user.id, org.id)
        // 6. Send Token + User Object
        res.send(package)
    } catch (error) {
        res.status(401)
        res.send({error})
    }
})

app.delete('/session/logout', async (req, res, next) => {
    let token =  req.token;
    if(token && token.uid) {
        await OnlineUsers.destroy({
            where: {
                userId: token.uid
            }
        })
    }
    res.send({
        "message": "OK"
    })
})

exports.lambdaHandler = serverless(app)
// app.listen(4000)