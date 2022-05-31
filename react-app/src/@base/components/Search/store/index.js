import { combineReducers } from '@reduxjs/toolkit';
import suggestions from './suggestionsSlice';
import places from './placesSlice';
import place from './placeSlice';

const reducer = combineReducers({
  suggestions,
  places,
  place
});

export default reducer