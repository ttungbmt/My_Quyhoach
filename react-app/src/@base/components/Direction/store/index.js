import { combineReducers } from '@reduxjs/toolkit';
import waypoints from './waypointsSlice';
import routes from './routesSlice';
import suggestions from './sugesstionsSlice';

const reducer = combineReducers({
  waypoints,
  suggestions,
  routes,
});

export default reducer