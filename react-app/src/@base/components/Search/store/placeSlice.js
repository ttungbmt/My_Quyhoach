import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { providers } from '../providers'
import { modelProvider } from '@base/components/Search/useSearchProviderStore'

export const getPlace = createAsyncThunk('search/place/getPlace', async ({ place_id }) => {
  const result = await (new providers['meeymap']).place({ place_id });
  return result;
});

export const selectPlaceRoot = (state) => state.search.place

const initialState = {
  loading: false,
  place_id: null,
  place: null
}

const placeSlice = createSlice({
  name: 'search/place',
  initialState,
  reducers: {
    setPlace: (state, {payload}) => {
      state.place = payload
    },
    resetPlace: (state) => initialState,
  },
  extraReducers: {
    [getPlace.pending]: (state, { meta }) => {
      state.loading = true
      state.place_id = meta.arg.place_id
    },
    [getPlace.fulfilled]: (state, {payload}) => {
      state.place = payload
      state.loading = false
    },
  },
});

export const selectPlace = createSelector([selectPlaceRoot], (root) => {
  return root.place ? modelProvider(root.place) : null
})

export const {setPlace, resetPlace} = placeSlice.actions

export default placeSlice.reducer;
