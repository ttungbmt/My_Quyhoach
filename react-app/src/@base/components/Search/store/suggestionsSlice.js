import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, nanoid } from '@reduxjs/toolkit'
import { resetPlaces } from './placesSlice'
import { resetPlace } from './placeSlice'
import { searchProvider, modelProvider } from '../useSearchProviderStore'

const suggestionsAdapter = createEntityAdapter({});

export const getSuggestions = createAsyncThunk('search/getSuggestions', async ({ query }) => {
  const result = await (searchProvider()).autoSuggest({ query });
  return _.map(result, values => ({id: nanoid(), ...values}))
});

// SLICE ----------------------------------------------------------------

const initialState = suggestionsAdapter.getInitialState({
  loading: false,
  query: '',
  provider: 'osm'
})

const suggestionsSlice = createSlice({
  name: 'search/suggestions',
  initialState,
  reducers: {
    setQuery: (state, {payload}) => {
      state.query = payload
    },

    resetSuggestions: (state) => initialState,
  },

  extraReducers: {
    [getSuggestions.pending]: (state, { meta }) => {
      state.loading = true
      state.query = meta.query
    },
    [getSuggestions.fulfilled]: (state, { payload }) => {
      suggestionsAdapter.setAll(state, payload)
      state.loading = false
    },
  }
})

// SELECTORS ----------------------------------------------------------------

export const selectSuggestionsRoot = ({ search }) => search.suggestions

export const { selectAll: selectSuggestions, selectById: selectSuggestionById } =
  suggestionsAdapter.getSelectors((state) => selectSuggestionsRoot(state));

export const selectQuery = (state) => selectSuggestionsRoot(state).query

export const selectLoading = (state) => selectSuggestionsRoot(state).loading

export const selectSuggestionModels = createSelector([selectSuggestions], (suggestions) => {
  return suggestions.map(s => modelProvider(s))
})

// ACTIONS ------------------------------------------------------------------

export const { resetSuggestions } = suggestionsSlice.actions

export const setQuery = (query) => (dispatch) => {
  if(query.length > 0) {
    dispatch(getSuggestions({ query }))
  } else {
    dispatch(resetAll())
  }
}

export const resetAll = () => (dispatch) => {
  dispatch(resetSuggestions())
  dispatch(resetPlaces())
  dispatch(resetPlace())
}

export default suggestionsSlice.reducer