var admin = require('firebase-admin');
var serviceAccount = require("./serviceAccountKey.json");
const User = require('./model/User');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://csci-5410-av.firebaseio.com"
});

async function signUp(authObject) {
    let {emailId, password, firstName, lastName, orgId} = authObject;
    
    /**
     * Create user in RDS
     */
    let dbUserObj = await User.create({
        emailId, password, firstName, lastName, orgId
    });
    let dbUserData = dbUserObj.get();
    let auth = admin.auth();
    let user;

    /**
     * Delete firebase user if exists
     */
    try {
        user = await auth.getUserByEmail(emailId)
        await auth.deleteUser(user.uid);
    } catch (error) {
    }

    /**
     * Create User
     */
    user = await auth.createUser({
        email: emailId,
        emailVerified: true,
        displayName: `${firstName} ${lastName}`,
        password: password,
        uid: `${dbUserData.id}`
    });

    /**
     * Store Security Question and Answer
     */
    let { securityQuestion, securityAnswer } = authObject;
    try {
        let fs = admin.firestore();
        let mfa = fs.collection("mfa")
        let docsRef = mfa.doc(`${user.uid}`)
        let doc = await docsRef.get()
        let data = doc.data()
        if(data === undefined) {
            await docsRef.create({
                'securityQuestion': securityQuestion,
                'securityAnswer': securityAnswer
            })
        } else {
            await docsRef.update({
                'securityQuestion': securityQuestion,
                'securityAnswer': securityAnswer
            })
        }
    } catch(error) {
        console.log(error)
    }


    return user

}

module.exports = {
    signUp
}
