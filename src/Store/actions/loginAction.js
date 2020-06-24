import {firebase} from "../../config/firebaseConfig";

const loginAction = (email, password) => async dispatch => {
  // firebase offers us this function signInWithEmailAndPassword
  // which will automatically create the user for us
  // it only has two arguments, the email and the password
let currentuser = firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    // then() function is used to know when the async call has ended
    // that way, we can notify our reducers that login was succesful

    .then(function(user) {
      // if the login was succesful, then
      // we dispatch to our reducers the fact that
      // login was succesful by sending true
      dispatch({ type: "login", payload: true });
      dispatch({ type: 'clearError'});
    })
    // if the login was not succesful we can catch the erros here

    .catch(function(error) {
      // if we have any erros, we'll throw an allert with that error
      dispatch({ type: 'setError' , payload : {msg : error.message, status : "login_error" , id: error.code}});
      console.log(error)
    });

    console.log(currentuser)
};
export default loginAction;
