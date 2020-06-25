// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

exports.addRole = functions.https.onCall((data, context) => {
  // get user and add admin custom claim
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        role: data.role
      });
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been made an ${data.role}.`
      };
    })
    .catch(err => {
      return err;
    });
});
