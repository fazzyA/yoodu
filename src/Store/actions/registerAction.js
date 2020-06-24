import {firestore, firebase } from "firebaseConfig";

// get me the firebase database
const databaseRef = firebase.database().ref();
console.log(databaseRef)
// get me the table named user-details
// if it does not exist, firebase will
// automatically create it
// const userDetailsRef = databaseRef.child("user-details");
// console.log(userDetailsRef)
const registerAction = (fname, lname, phone, email, password) => async dispatch => {
  
  
  // firebase offers us this function createUserWithEmailAndPassword
  // which will automatically create the user for us
  // it only has two arguments, the email and the password
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    // then() function is used to know when the async call has ended
    // that way, we can notify our reducers that register was succesful
    .then(function(user) {
      user.updateProfile({
        displayName: fname+" "+lname,
        photoURL: "default_profile.png"
      })
      // we take the user id and it's name and we add it in our
      // user-details table
      // userDetailsRef.push().set({ userId: user.user.uid, userName: name });
      let profile = firestore.collection('user-details').add({
        userId: user.user.uid,
        role : "client",
          fname,
          lname,
          phone,
          email,
          joinedAt : Date.now(),
          }).then(() => {
             // register was succesful by sending true
              dispatch({ type: "register", payload: true });
              dispatch({ type: 'clearError'});
          }).catch(err => {
            console.log(err);
            dispatch({ type: 'setError' , payload : {msg : err.message, status : "error" , id: err.code}});
     
      });
      // after that we dispatch to our reducers the fact that
      console.log(profile)
     
      // if the register was not succesful we can catch the erros here
    })
    .catch(function(error) {
      // if we have any erros, we'll throw an allert with that error
      dispatch({ type: 'setError' , payload : {msg : error.message, status : "error" , id: error.code}});
      console.log(error)
      return(error)
    });
};
export default registerAction;