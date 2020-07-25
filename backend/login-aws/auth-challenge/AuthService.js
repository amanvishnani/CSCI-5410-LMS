const Challenge = require('./model/Challenge')
var admin = require('firebase-admin');
var serviceAccount = require("./serviceAccountKey.json");
const User = require('./model/User');
const Org = require('./model/Org');
const OnlineUsers = require('./model/OnlineUsers')
var jwt = require('jsonwebtoken');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://csci-5410-av.firebaseio.com"
});

let fs = admin.firestore()
let auth = admin.auth()

/**
 * Find and send challenge object.
 * Throw exception if not found
 */

async function findChallenge(challengeCode) {
    let obj = await Challenge.findOne({
        where: {
            text: challengeCode
        }
    })
    if(null === obj) {
        throw {
            message: "Challenge Not found"
        }
    }
    return obj;
}

/**
 * Verify Challenge, throws exception if not entered wrong answer
 */

async function verifyChallenge(userId, answer) {
    
    let docRef = fs.doc(`/mfa/${userId}`);
    let docSS = await docRef.get()
    let {securityAnswer} = docSS.data();
    if(answer === securityAnswer) {
        return true
    } else {
        throw "Challenge Failed"
    }
}

async function mintToken(userId) {
    let user = await User.findByPk(userId)
    let org = await user.getOrg()
    let { firstName, lastName, emailId } = user.get()
    let { id, name } = org.get()
    let token = await auth.createCustomToken(`${userId}`, {
        firstName, lastName, emailId, orgId: id, orgName: name
    })
    return {token, user, org: {
        id, name
    }};
}

async function setOnlineStatus(userId, orgId) {
    let obj = await OnlineUsers.findOne({
        where: {
            userId
        }
    });
    if(obj === null) {
        await OnlineUsers.create({
            userId, orgId
        })
    }
}

async function verifyToken(token) {
    try {
        let decoded = jwt.decode(token)
        return decoded
    } catch (error) {
        return;
    }
}

module.exports = {
    mintToken,
    verifyChallenge,
    findChallenge,
    setOnlineStatus,
    verifyToken
}