import { firestore, firebase } from '../../config/firebaseConfig';
import * as firebaser from 'firebase'; // get me the firebase restaurantbase
// const restaurantbaseRef = firebase.restaurantbase().ref();
// console.log(restaurantbaseRef)
//

var user = firebase.auth().currentUser;

// Add new restaurant
export const addCategory = category => async (dispatch, getState) => {
  // console.log("****************************************************************************")
  console.log(user);
  //restaurant.userId = user.uid
  firebase.auth().onAuthStateChanged(async user => {
    if (user) {
      category.status = 'open';
      console.log(user);
      category.createdAt = Date.now();

      console.log(category);

      const state = getState();
      console.log(state);

      const restaurant = state.restaurantState.attributes;

      firestore
        .collection('restaurant')
        .doc(restaurant.id)
        .collection('categories')
        .add(category)
        .then(res => {
          console.log(res);
          // register was succesful by sending true
          dispatch({
            type: 'addCategory',
            payload: { ...category, id: res.id }
          });
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
export const listCategories = type => async (dispatch, getState) => {
  // console.log("****************************************************************************")
  // const state = getState();
  // console.log(state.authState);
  var user = firebase.auth().currentUser;
  console.log(user);
  if (user) {
    console.log(user);

    const state = getState();
    console.log(state);

    let catRef = firestore
      .collection('restaurant')
      .doc(state.restaurantState.attributes.id)
      .collection('categories')
      .orderBy('sno');

    try {
      // const arestaurants = await restaurantRef.get();
      const catarray = await catRef.get();
      const categories = [];

      catarray.forEach(categoryList => {
        categories.push({ ...categoryList.data(), id: categoryList.id });
      });

      console.log(categories);

      dispatch({ type: 'listCategories', payload: categories });
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
export const updateCategory = category => async (dispatch, getState) => {
  console.log('inside update category');
  //restaurant.userId = user.uid
  var user = firebase.auth().currentUser;
  if (user) {
    console.log(user);

    const state = getState();
    console.log(state);

    const ccat = state.restaurantState.categories.find(
      cat => cat.id === category.id
    );
    console.log(ccat);

    const updatedone = { ...ccat, ...category };
    console.log(updatedone);

    firestore
      .collection('restaurant')
      .doc(state.restaurantState.attributes.id)
      .collection('categories')
      .doc(category.id)
      .set({ ...ccat, ...category })
      .then(res => {
        console.log(res);
        dispatch({ type: 'UpdateCategory', payload: { ...ccat, ...category } });
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
export const deleteCategory = catid => async (dispatch, getState) => {
  console.log('deleting------------------restaurant');
  //restaurant.userId = user.uid
  var user = firebase.auth().currentUser;
  if (user) {
    const state = getState();
    console.log(state);

    let catRef = firestore
      .collection('restaurant')
      .doc(state.restaurantState.attributes.id)
      .collection('categories')
      .doc(catid)
      .delete()

      .then(res => {
        // console.log(
        //   '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'
        // );
        console.log(res);

        let categories = state.restaurantState.categories.filter(
          cat => cat.id !== catid
        );

        categories = categories.map((cat, index) => {
          cat.sno = index;
          return cat;
        });

        let catRef = firestore
          .collection('restaurant')
          .doc(state.restaurantState.attributes.id)
          .collection('categories');

        let catfinal = categories.map(cat => {
          catRef.doc(cat.id).set(cat);
        });

        dispatch({ type: 'deleteCategory', payload: categories });
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

// delete restaurant
export const sortCategories = categories => async (dispatch, getState) => {
  console.log('sorting------------------categories');
  //restaurant.userId = user.uid
  var user = firebase.auth().currentUser;
  if (user) {
    const state = getState();
    console.log(state);

    try {
      // let categories = state.restaurantState.categories;
      console.log(categories);
      categories = categories.map((cat, index) => {
        cat.sno = index;
        return cat;
      });

      let catRef = firestore
        .collection('restaurant')
        .doc(state.restaurantState.attributes.id)
        .collection('categories');

      let catfinal = categories.map(cat => {
        catRef.doc(cat.id).set(cat);
      });

      dispatch({ type: 'sortCategory', payload: categories });
      dispatch({ type: 'clearError' });
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
  } // user is undefined if no user signed in
  else
    dispatch({
      type: 'setError',
      payload: {
        msg: 'user not found',
        status: 'error',
        id: 77889
      }
    });
};

export const addItem = item => async (dispatch, getState) => {
  console.log('inside add items');
  //restaurant.userId = user.uid
  var user = firebase.auth().currentUser;
  if (user) {
    console.log(user);

    const state = getState();
    console.log(state);
    item.soldout = false;
    item.hide = false;
    item.createdAt = Date.now();

    const restaurant = state.restaurantState.attributes;
    console.log(restaurant.id);
    console.log(item);
    item.image = item.image.name;
    
    const options = item.options;
    const variations = item.variations;
    delete item.options;
    delete item.variations;
    try {
      const ritem = await firestore
        .collection('restaurant')
        .doc(restaurant.id)
        .collection('categories')
        .doc(item.catid)
        .collection('items')
        .add(item);

      console.log(ritem);
      console.log(ritem.id);

      options.map(async opt => {
        delete opt.tableData;
        const ropt = await firestore
          .collection('restaurant')
          .doc(restaurant.id)
          .collection('categories')
          .doc(item.catid)
          .collection('items')
          .doc(ritem.id)
          .collection('options')
          .add({option : opt.option});
        console.log(`options id ${ropt.id}`);
        opt.detail.map(async sub => {
          delete sub.tableData;
          const rsub = await firestore
            .collection('restaurant')
            .doc(restaurant.id)
            .collection('categories')
            .doc(item.catid)
            .collection('items')
            .doc(ritem.id)
            .collection('options')
            .doc(ropt.id)
            .collection('detail')
            .add(sub);

            console.log(rsub)
        });

        console.log(ropt);
      });

      variations.map(async opt => {
        delete opt.tableData;
        const ropt = await firestore
          .collection('restaurant')
          .doc(restaurant.id)
          .collection('categories')
          .doc(item.catid)
          .collection('items')
          .doc(ritem.id)
          .collection('variations')
          .add(opt);

        console.log(ropt);
      });
      // register was succesful by sending true
      dispatch({
        type: 'addItem',
        payload: { ...item }
      });
      dispatch({ type: 'clearError' });
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
  } // user is undefined if no user signed in
  else
    dispatch({
      type: 'setError',
      payload: {
        msg: 'undefined user',
        status: 'error',
        id: 77889
      }
    });
};
