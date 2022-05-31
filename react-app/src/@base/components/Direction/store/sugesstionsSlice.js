import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit'
import {providers} from '../../Search/index'

const suggestionsAdapter = createEntityAdapter({});

export const getSuggestions = createAsyncThunk('direction/getSuggestions', async ({ selectedId, query }) => {
  const data = await (new providers['meeymap']).autoSuggest({ query });

  return _.map(data, v => ({id: nanoid(), ...v, selectedId}))
});


const suggestionsSlice = createSlice({
  name: 'direction/suggestions',
  initialState: suggestionsAdapter.getInitialState({
    selectedId: null
  }),
  reducers: {
    setSelectedId: (state, {payload}) => {
      state.selectedId = payload
    },


    removeSuggestions: (state, {payload}) => {
      const selectedIds = _.map(_.filter(state.entities, {selectedId: payload}), 'id')

      suggestionsAdapter.removeMany(state, selectedIds)
    },
  },
  extraReducers: {
    [getSuggestions.fulfilled]: (state, { payload }) => {
      const selectedIds = _.map(_.filter(state.entities, {selectedId: state.selectedId}), 'id')

      if(!_.isEmpty(selectedIds)) suggestionsAdapter.removeMany(state, selectedIds)

      suggestionsAdapter.addMany(state, payload)
    },
  },
})

export const { selectAll: selectSuggestions, selectById: selectSuggestionItemById } =
  suggestionsAdapter.getSelectors((state) => state.direction.suggestions);

export const selectSuggestionsRoot = ({ direction }) => direction.suggestions

export const selectSelectedId = ({ direction }) => direction.suggestions.selectedId

export const selectSuggestionsSelected = createSelector([selectSuggestions, selectSelectedId], (suggestions, selectedId) => {
  return _.filter(suggestions, {selectedId});
})

export const { setSelectedId, removeSuggestions } = suggestionsSlice.actions

export default suggestionsSlice.reducer