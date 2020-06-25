// import { GET_ERRORS, CLEAR_ERRORS } from '../actions/errorActions';
import errorlist from './../actions/errors'
const initialState = {
  msg: null,
  status: null,
  id: null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case "setError":
      return {
        msg: (action.payload.msg)?action.payload.msg: errorlist[action.payload.id] ,
        status: action.payload.status,
        id: action.payload.id
      };
    case "clearError":
      return {
        msg: null,
        status: null,
        id: null
      };
    default:
      return state;
  }
}
