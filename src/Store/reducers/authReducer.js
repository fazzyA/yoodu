const initialState = {
  loaded: false,
  loggedIn: false
  // currentUser: null
};

export default (state = initialState, action) => {
  let loading = state.loading;
  if (action.payload === true) {
    console.log("playload "+ action.payload)
    state.loading = false;
  }
  switch (action.type) {
    // in both cases, we want to tell our app,
    // if the user is logged in or not
    // if the user registers, he will automatically be logged in
    case 'register':
      console.log('register is ', action.payload);
      return {
        // keep old state
        ...state,
        loading : false,
        // add true/false if the user is or not logged in
        currentUser : action.payload,
        loggedIn : true
      };
    case 'login':
      // console.log("login is ", action.payload);
      return {
        // keep old state
        ...state,
        
        // add true/false if the user is or not logged in
        loggedIn: action.payload,
        loaded: action.payload === true ? true : false
      };

    case 'logout':
      // console.log("loginout ", action.payload);
      return {
        // keep old state
        ...state,
        // add true/false if the user is or not logged in
        loggedIn: action.payload,
        currentUser: { uid: null, role: null, email: null }
        // loaded : action.payload === true ? true : false
      };

    case 'authenticate':
      return {
        // keep old state
        ...state,
        loading: false,
        // add true/false if the user is or not logged in
        loggedIn: action.payload.loading,
        loaded: action.payload.loading === true ? true : false,
        currentUser: action.payload.currentUser
      };

    default:
      console.log(state);
      return state;
  }
};
