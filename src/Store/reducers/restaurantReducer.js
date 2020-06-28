export default (
  state = {
    status: 'loading',
    availableRestaurants: [],
    sheduledRestaurants: [],
    allRestaurants: []
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
        availableRestaurants: Object.values(action.payload).concat(
          state.availablejobs
        ),
        status: 'created'
      };

    case 'UpdateRestaurant':
      console.log('getting ', action.payload);

      console.log(action.payload);
      let allRestaurants = state.allRestaurants.map(job => {
        if (job.id === action.payload.job.id)
          job = Object.values(action.payload);
      });
      return {
        // keep the old state
        ...state,
        allRestaurants,
        status: 'created'
      };

    case 'deleteRestaurant':
      console.log("deleting' ", action.payload);
      console.log(action.payload);
      console.log(action.payload);
      allRestaurants = state.allRestaurants.filter(
        job => job.id !== action.payload.job.id
      );

      return {
        // keep the old state
        ...state,
        allRestaurants,
        status: 'deleted'
      };

    case 'listRestaurants':
      // console.log("getting################################# ", action.payload);
      console.log(action.payload);
      return {
        ...state,
        // availableRestaurants: action.payload.jobs,
        status: 'loaded',
        allRestaurants: action.payload.jobs
      };

    default:
      return state;
  }
};
