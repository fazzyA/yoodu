import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reducers from '../Store';
import reduxThunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default function configureStore() {
  return createStore(
    combineReducers({
      ...reducers
    }),
    {
      authState: {
        loading: true,
        currentUser: { uid: null, role: null, email: null }
      }
    },
    composeEnhancers(applyMiddleware(reduxThunk))
  );
}
