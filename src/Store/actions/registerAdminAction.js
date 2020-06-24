import {firestore, firebase , firefunctions} from "firebaseConfig";

// get me the firebase database
const databaseRef = firebase.database().ref();
console.log(databaseRef)

const registerAdminAction = (email) => async dispatch => {
    const addAdminRole = firefunctions.httpsCallable('addAdminRole');
    
    addAdminRole({ email: email }).then(result => {
        console.log(result);
        dispatch({ type: "register", payload: true });
      })
    .catch(function(error) {
      // if we have any erros, we'll throw an allert with that error
      dispatch({ type: 'setError' , payload : {msg : error.message, status : "error" , id: error.code}});
      console.log(error)
      return(error)
    });
};
export default registerAdminAction;