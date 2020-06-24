const initialState = {
  loaded : false,
  loggedIn : false,
  // currentUser: null
};


export default (state=initialState, action) => {

    switch (action.type) {
            
        case "listUsers":
          return { 
              // keep old state
              ...state,
              // add true/false if the user is or not logged in
              users : action.payload
          };

          case "getUser":
          return { 
              // keep old state
              ...state,
              loaded:true,
              // add true/false if the user is or not logged in
              userDetail : action.payload,
              users:action.payload.users
          };

      default:
        console.log(state)
        return state;
    }
  };