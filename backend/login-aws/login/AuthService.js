const firebase = require('firebase')
const { v4: uuidv4 } = require('uuid');
const Challenge = require('./model/Challenge')


var firebaseConfig = {
    apiKey: "AIzaSyAnjc7Guj74WNwuvoQhRIP77sA5il0YJqo",
    authDomain: "csci-5410-av.firebaseapp.com",
    databaseURL: "https://csci-5410-av.firebaseio.com",
    projectId: "csci-5410-av",
    storageBucket: "csci-5410-av.appspot.com",
    messagingSenderId: "63573268835",
    appId: "1:63573268835:web:1aab8a8fb1d1db20da9b56"
};
console.log("Init App");
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/**
 * Returns user object on success.
 * 
 */
async function signIn(emailId, password) {
    const auth = firebase.auth()
    let result = await auth.signInWithEmailAndPassword(emailId, password)
    return result;
}

/**
 * Returns a challenge for UserId
 */
async function createChallenge(userId) {
    const fs = firebase.firestore();
    let docRef = fs.doc(`/mfa/${userId}`)
    let docSnap = await docRef.get()
    let { securityQuestion } = docSnap.data()
    let challengeText = uuidv4()
    await Challenge.create({
        text: challengeText,
        userId: userId
    })
    let challengeeObj = {
        type: "CHALLENGE",
        question: securityQuestion,
        challengeCode: challengeText
    }
    return challengeeObj;
}
module.exports = {
    signIn, createChallenge
}