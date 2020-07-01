export default (
  state = {
    status: 'loading',
    attributes: {},
    categories: []
  },
  action
) => {
  switch (action.type) {
    case 'CreateRestaurant':
      console.log('getting ', action.payload);
      console.log(action.payload);
      return {
        // keep the old state
        ...state,
        // add all the cards from the database
        // they will come in a json format,
        // so we need to convert them to array
        attributes: { ...action.payload },
        status: 'created'
      };

    case 'addCategory':
      console.log('getting ', action.payload);
      console.log(action.payload);
      const upcategories = state.categories.concat([action.payload]);
      return {
        // keep the old state
        ...state,

        categories: upcategories,
        status: 'created'
      };

    case 'UpdateCategory':
      console.log('getting ', action.payload);

      console.log(action.payload);
      let setcategories = state.categories.map(cat => {
        if (cat.id === action.payload.id) 
        return cat = action.payload;
        else
        return cat
    
      });
      
      return {
        // keep the old state
        ...state,
        categories: setcategories,
        // allRestaurants,
        status: 'created'
      };

    case 'deleteCategory':
      console.log("deleting' ", action.payload);
      console.log(state);
      console.log(action.payload);
      // let categories = state.categories.filter(
      //   cat => cat.id !== action.payload
      // );

      // categories = categories.map((cat, index) => {
      //   cat.sno = index;
      //   return cat;
      // });

      return {
        // keep the old state
        ...state,
        categories: action.payload,
        status: 'deleted'
      };

    case 'listCategories':
      // console.log("getting################################# ", action.payload);
      console.log(action.payload);
      return {
        ...state,
        // availableRestaurants: action.payload.jobs,
        status: 'loaded',
        categories: action.payload
      };

      case 'sortCategories':
      console.log("sorted ", action.payload);
      console.log(state);
      console.log(action.payload);
      // let categories =

      return {
        // keep the old state
        ...state,
        categories: action.payload,
        status: 'sorted'
      };

    default:
      return state;
  }
};
