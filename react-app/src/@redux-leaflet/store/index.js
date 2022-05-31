import { combineReducers } from '@reduxjs/toolkit';
import config from './configSlice';
import layers from './layersSlice';

const reducer = combineReducers({
  config,
  layers
});

export {default as useMapStore, getMap} from './useMapStore'

export default reducer;
