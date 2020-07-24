const firebase = require('firebase')
const admin = require('firebase-admin');
var serviceAccount = require("./serviceAccountKey.json");

console.log("Init Admin");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://csci-5410-av.firebaseio.com"
});

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
    console.log("Attempting to read Doc 1");
    let fs = admin.firestore()
    let mfa = fs.collection("mfa")
    let docsRef = mfa.doc(`${user.uid}`)
    let doc = await docsRef.get()
    let data = doc.data()
    console.log("Attempting to read Doc 4");
    let challangeObj = {
        type: "CHALLENGE",
        question: data.securityQuestion
    }
    return challangeObj;
}
module.exports = {
    signIn, createChallenge
}