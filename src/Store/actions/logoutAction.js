import {firebase} from "firebaseConfig";

const logoutAction = () => async dispatch => {
  // firebase offers us this function signInWithEmailAndPassword
  // which will automatically create the user for us
  // it only has two arguments, the email and the password
  firebase
    .auth()
    .signOut()
    // then() function is used to know when the async call has ended
    // that way, we can notify our reducers that login was succesful

    .then(function(user) {
      // if the login was succesful, then
      // we dispatch to our reducers the fact that
      // login was succesful by sending true
      console.log("successfully logout")
      dispatch({ type: "logout", payload: false });
    })
    // if the login was not succesful we can catch the erros here

    .catch(function(error) {
      // if we have any erros, we'll throw an allert with that error
        console.log(error)
      alert(error);
    });
};
export default logoutAction;