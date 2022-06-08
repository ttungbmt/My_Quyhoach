import { combineReducers } from '@reduxjs/toolkit';
import config from './configSlice';
import layers from './layersSlice';
import popups from './popupsSlice';

const reducer = combineReducers({
  config,
  layers,
  popups
});

export {default as useMapStore, getMap} from './useMapStore'

export default reducer;
