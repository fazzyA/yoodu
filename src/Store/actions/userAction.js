import { firestore, firebase } from '../../config/firebaseConfig';

// get user details
export const getUser = uid => async (dispatch, getState) => {
  console.log(
    '****************************************************************************'
  );
  const state = getState();
  
  var user = firebase.auth().currentUser;
  console.log(user);
  console.log(user.uid);
  const { uid} = user;
  const adminck = await user.getIdTokenResult();
  console.log(adminck.claims.role);
  const role = adminck.claims.role;

  if (user ) {
    console.log("iiiiiiiiiiiiiiiiiiiiiiiiii");
    var users = [];
    let userRef = firestore.collection(role).where('userId', '==', uid);

    try {
      const ausers = await userRef.get();
      console.log('()()()()()()()()()()()()()()()');
      console.log(ausers);
      ausers.forEach(usr => {
        console.log(usr.data());
        users.push({ ...usr.data() });
      });
      console.log(users);
      dispatch({ type: 'getUser', payload: { ...users[0] } });
      //{...users, userDetail : users.filter((user)=>user.userId===uid ) } });
      dispatch({ type: 'clearError' });
      // console.log("end")
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'setError',
        payload: {
          msg: err.message,
          status: 'error',
          id: err.code
        }
      });
    }
  } else {
    console.log('error');
  }
  // });
};
