import { firestore, firebase } from '../../config/firebaseConfig';

// get user details
export const getUser = uid => async (dispatch, getState) => {
  // console.log(
  //   '****************************************************************************'
  // );
  const state = getState();
  
  var user = firebase.auth().currentUser;
  // console.log(user);
  // console.log(user.uid);
  const { uid} = user;
  const adminck = await user.getIdTokenResult();
  // console.log(adminck.claims.role);
  const role = adminck.claims.role;

  if (user ) {
    // console.log("iiiiiiiiiiiiiiiiiiiiiiiiii");
    var users = [];
    let userRef = firestore.collection(role).where('userId', '==', uid);

    try {
      const ausers = await userRef.get();
      // console.log('()()()()()()()()()()()()()()()');
      // console.log(ausers);
      ausers.forEach(usr => {
        console.log(usr.data());
        users.push({ ...usr.data(), id: usr.id });
      });
      if(role==="restaurant")
      dispatch({ type: 'CreateRestaurant', payload: { ...users[0] } })
      // console.log(users);
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

// Update new restaurant
export const updateRestaurant = restaurant => async dispatch => {
  // console.log(user)
  //restaurant.userId = user.uid
  var user = firebase.auth().currentUser;
  if (user) {
    console.log(user);
    // restaurant.userId = user.uid;
    //  restaurant.status = "open"
    //  restaurant.createdAt = Date.now()
    console.log(restaurant);
    firestore
      .collection('restaurant')
      .doc(restaurant.id)
      .set(restaurant)
      .then(res => {
        console.log(res);
        dispatch({ type: 'UpdateRestaurant', payload: { restaurant } });
        dispatch({ type: 'clearError' });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: 'setError',
          payload: {
            msg: err.message,
            status: 'error',
            id: err.code
          }
        });
      });
  } // user is undefined if no user signed in
  else
    dispatch({
      type: 'setError',
      payload: {
        msg: '',
        status: 'error',
        id: 77889
      }
    });
};
