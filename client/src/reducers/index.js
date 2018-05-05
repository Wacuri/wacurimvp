import { combineReducers } from 'redux';
import list from './list';

const rootReducer = combineReducers({
  list, // shorthand for lists: lists
  openTokKey: (state = {}) => state
});

export default rootReducer;
