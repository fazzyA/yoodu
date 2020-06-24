import {firebase} from "firebaseConfig";

const authAction = () => async dispatch => {
  
 firebase
    .auth()
    .onAuthStateChanged(user => {
        if (user) {
            console.log(user)
            console.log(user.uid)
            user.getIdTokenResult().then(idTokenResult => {
    //   user.admin = idTokenResult.claims.admin;
    console.log(idTokenResult)
      const currUser = {
        uid: idTokenResult.claims.user_id,
        displayName: user.displayName,
        role : idTokenResult.claims.admin?"admin":"client",
        email:idTokenResult.claims.email
        
      }
      console.log(user)
      dispatch({ type: "authenticate", payload: {loading:true, currentUser : currUser} })
    });
            // dispatch({ type: "authenticate", payload: {loading:true, currentUser : user} });
            dispatch({ type: 'clearError'});
          
        } else {
            dispatch({ type: "authenticate", payload: false });
            console.log("user not found")
            // dispatch({ type: 'clearError'});
        }
      });
    
      
    // console.log(currentuser)
};
export default authAction;