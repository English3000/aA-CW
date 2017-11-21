import { combineReducers } from 'redux';
import benchesReducer from './benches_reducer';

export default combineReducers({
  benches: benchesReducer
});
