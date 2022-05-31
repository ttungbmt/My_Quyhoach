import { combineReducers } from '@reduxjs/toolkit';
import config from './configSlice';

const reducer = combineReducers({
  config,
});

export {default as useMapboxStore, getMap} from './useMapboxStore'

export default reducer;
