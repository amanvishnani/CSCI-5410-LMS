const express = require('express')
var bodyParser = require('body-parser');


const User = require('./model/User')
const Org = require('./model/Org');
const { signUp } = require('./AuthService');

const PORT = process.env.PORT || 3000;

let app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/orgs', getAllOrgNames)
app.get('/check-email-availability/:emailId', checkUserExists)
app.post('/register', registerUser)

app.listen(PORT, "0.0.0.0", () => console.log(`Listening on Port ${PORT}`))

async function registerUser(req, res, next) {

    let { password, securityQuestion, securityAnswer, emailId, orgId, firstName, lastName } = req.body;
    if (!emailId || !password || !orgId) {
        res.json({
            "message": "orgId, emailId and password required."
        });
        res.status = 400;
        next();
        return;
    }

    if (!securityQuestion || !securityAnswer) {
        res.json({
            "message": "Security Questions and Security answers are required."
        });
        res.status = 400;
        next();
        return;
    }

    let user = await findUserByEmail(emailId);
    if( user !== null ) {
        res.send({
            "message": "User Already Exists"
        })
        res.status(400)
        next()
        return;
    }
    
    let createdUser = await signUp(req.body)

    res.send({
        message: "OK",
        data: createdUser
    })
    next()
}

async function getAllOrgNames(req, res, next) {
    res.send(await Org.findAll())
}

async function checkUserExists(req, res, next) {
    let emailId = req.params.emailId;
    if(!emailId) {
        res.json({
            "message": "Email required in path parms."
        });
        res.status = 400;
        next();
        return;
    }
    let user = await findUserByEmail(emailId)
    let available = false;
    if( null === user ) {
        available = true;
    }
    res.send({
        available
    })
    next()
}

async function findUserByEmail(emailId) {
    let user = await User.findOne({
        where:{
            emailId
        }
    })
    return user;
}