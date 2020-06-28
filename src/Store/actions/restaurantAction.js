import { firestore, firebase } from '../../config/configureStore';
import * as firebaser from 'firebase'; // get me the firebase restaurantbase
// const restaurantbaseRef = firebase.restaurantbase().ref();
// console.log(restaurantbaseRef)
//

var user = firebase.auth().currentUser;

// Add new restaurant
export const createrestaurant = restaurant => async dispatch => {
  console.log(user);
  //restaurant.userId = user.uid

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user);
      restaurant.userid = user.uid;
      restaurant.status = 'open';
      restaurant.createdAt = Date.now();
      console.log(restaurant);
      firestore
        .collection('restaurants')
        .add(restaurant)
        .then(() => {
          // register was succesful by sending true
          dispatch({ type: 'Createrestaurant', payload: { restaurant } });
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
  });
};

// get all available restaurants
export const listrestaurants = type => async (dispatch, getState) => {
  // console.log("****************************************************************************")
  const state = getState();
  console.log(state.authState);
  var user = firebase.auth().currentUser;
  console.log(user);
  if (user) {
    console.log(user);
    var restaurants = [];
    let restaurantRef = null;
    let rjRef = firestore.collection('rejectedrestaurants').doc(user.uid);
    if (state.authState.currentUser.role === 'client' && type !== 'open')
      restaurantRef = firestore
        .collection('restaurants')
        .where('status', '==', type)
        .where('acceptedBy', '==', user.uid);
    else
      restaurantRef = firestore
        .collection('restaurants')
        .where('status', '==', type);

    try {
      const arestaurants = await restaurantRef.get();
      const rjarray = await rjRef.get();
      const rejected = rjarray.data() ? rjarray.data().rrestaurants : [];
      // const adminck = await user.getIdTokenResult()
      // // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
      // console.log(adminck)
      arestaurants.forEach(restaurant => {
        if (!rejected.includes(restaurant.id))
          restaurants.push({ ...restaurant.data(), id: restaurant.id });
        else if (state.authState.currentUser.role === 'admin') {
          restaurants.push({ ...restaurant.data(), id: restaurant.id });
        }
      });
      console.log(restaurants);
      dispatch({ type: 'listrestaurants', payload: { restaurants } });
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
    restaurant.userId = user.uid;
    //  restaurant.status = "open"
    //  restaurant.createdAt = Date.now()
    console.log(restaurant);
    firestore
      .collection('restaurants')
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

//db.collection('cities').doc('DC').delete();

// delete restaurant
export const deleterestaurant = restaurant => async dispatch => {
  console.log('deleting------------------restaurant');
  //restaurant.userId = user.uid
  var user = firebase.auth().currentUser;
  if (user) {
    console.log(restaurant);
    let deleteDoc = firestore
      .collection('restaurants')
      .doc(restaurant.id)
      .delete()
      //  let deleteDoc = db.collection('cities').doc('DC').delete();

      .then(res => {
        //  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.log(res);
        dispatch({ type: 'deleterestaurant', payload: { restaurant } });
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

// accept restaurant
export const acceptrestaurant = restaurant => async (dispatch, getState) => {
  console.log('Accepting------------------restaurant');
  const state = getState();

  var user = firebase.auth().currentUser;
  if (user) {
    // restaurant.userid = user.uid
    restaurant.status = 'accepted';
    restaurant.acceptedOn = Date.now();
    console.log(restaurant);
    restaurant.acceptedBy = user.uid;

    console.log(restaurant);
    firestore
      .collection('restaurants')
      .doc(restaurant.id)
      .set(restaurant)
      .then(res => {
        console.log(res);
        dispatch({ type: 'Acceptrestaurant', payload: { restaurant } });
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

// quit restaurant
export const quitrestaurant = restaurant => async (dispatch, getState) => {
  console.log('quitting------------------restaurant');
  // const state = getState();

  var user = firebase.auth().currentUser;
  if (user) {
    // restaurant.userid = user.uid
    restaurant.status = 'open';
    restaurant.acceptedOn = null;
    // console.log(restaurant)
    restaurant.acceptedBy = null;

    // console.log(restaurant)
    firestore
      .collection('restaurants')
      .doc(restaurant.id)
      .set(restaurant)
      .then(res => {
        console.log(res);
        dispatch({ type: 'Quitrestaurant', payload: { restaurant } });
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

// done restaurant
export const donerestaurant = restaurant => async (dispatch, getState) => {
  console.log('done------------------restaurant');
  // const state = getState();

  var user = firebase.auth().currentUser;
  if (user) {
    // restaurant.userid = user.uid
    restaurant.status = 'done';
    restaurant.doneAt = Date.now();
    console.log(restaurant);
    restaurant.doneBy = user.uid;

    console.log(restaurant);
    firestore
      .collection('restaurants')
      .doc(restaurant.id)
      .set(restaurant)
      .then(res => {
        console.log(res);
        dispatch({ type: 'Donerestaurant', payload: { restaurant } });
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

// reject restaurant
export const rejectrestaurant = restaurant => async dispatch => {
  console.log('Rejected------------------restaurant');
  // const state = getState();
  var user = firebase.auth().currentUser;
  if (user) {
    // firestore.collection('Rejectedrestaurants').doc(user.uid).set(restaurant.id)
    var userRef = firestore.collection('rejectedrestaurants').doc(user.uid);

    // Atomically add a new region to the "regions" array field.
    userRef
      .update({
        rrestaurants: firebaser.firestore.FieldValue.arrayUnion(restaurant.id)
      })
      .then(res => {
        console.log(res);
        dispatch({ type: 'Rejectrestaurant', payload: { restaurant } });
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
