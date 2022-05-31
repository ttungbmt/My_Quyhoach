import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const getPlaces = createAsyncThunk('search/places/getPlaces', async (params) => {
  return data;
});

const placesAdapter = createEntityAdapter({});

export const selectPlacesRoot = (state) => state.search.places

export const { selectAll: selectPlaces, selectById: selectPlaceById } = placesAdapter.getSelectors(
  (state) => selectPlacesRoot(state)
);

const initialState = placesAdapter.getInitialState({
  loading: false
})

const placesSlice = createSlice({
  name: 'search/places',
  initialState,
  reducers: {
    resetPlaces: (state) => initialState
  },
  extraReducers: {
    [getPlaces.fulfilled]: (state, {payload}) => {

    },
  },
});

export const {resetPlaces} = placesSlice.actions

export default placesSlice.reducer;
