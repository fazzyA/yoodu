import {
  firestore,
  firebase,
  firefunctions
} from '../../config/firebaseConfig';

// get me the firebase database
const databaseRef = firebase.database().ref();
console.log(databaseRef);
// get me the table named user-details
// if it does not exist, firebase will
// automatically create it
// const userDetailsRef = databaseRef.child("user-details");
// console.log(userDetailsRef)
const registerAction = values => async dispatch => {
  // firebase offers us this function createUserWithEmailAndPassword
  // which will automatically create the user for us
  // it only has two arguments, the email and the password
  try {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password);

    const addRole = await firefunctions.httpsCallable('addRole');

    await addRole({ email: values.email, role: values.role });

    delete values.password;
    delete values.cpassword;
    await firestore.collection('user-details').add({
      userId: user.user.uid,

      ...values
    });
    console.log(user);
    await dispatch({
      type: 'register',
      payload: { uid: user.user.uid, role: values.role, email: values.email }
    });
    await dispatch({ type: 'clearError' });
  } catch (err) {
    console.log(err);
    await dispatch({
      type: 'setError',
      payload: { msg: err.message, status: 'error', id: err.code }
    });
  }

  // firebase
  //   .auth()
  //   .createUserWithEmailAndPassword(values.email, values.password)
  //   // then() function is used to know when the async call has ended
  //   // that way, we can notify our reducers that register was succesful
  //   .then(function(user) {
  //     // user.updateProfile({
  //     //   displayName: fname+" "+lname,
  //     //   photoURL: "default_profile.png"
  //     // })
  //     // we take the user id and it's name and we add it in our
  //     // user-details table
  //     // userDetailsRef.push().set({ userId: user.user.uid, userName: name });
  //     delete values.password;
  //     delete values.cpassword;
  //     let profile = firestore
  //       .collection('user-details')
  //       .add({
  //         userId: user.user.uid,

  //         ...values
  //       })
  //       .then(() => {
  //         // register was succesful by sending true
  //         dispatch({ type: 'register', payload: true });
  //         dispatch({ type: 'clearError' });
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         dispatch({
  //           type: 'setError',
  //           payload: { msg: err.message, status: 'error', id: err.code }
  //         });
  //       });
  //     // after that we dispatch to our reducers the fact that
  //     console.log(profile);
  //     return user;
  //     // if the register was not succesful we can catch the erros here
  //   })
  //   .catch(function(error) {
  //     // if we have any erros, we'll throw an allert with that error
  //     dispatch({
  //       type: 'setError',
  //       payload: { msg: error.message, status: 'error', id: error.code }
  //     });
  //     console.log(error);
  //     return error;
  //   });
};
export default registerAction;
