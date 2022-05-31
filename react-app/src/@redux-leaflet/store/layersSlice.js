import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import {nanoid} from '@reduxjs/toolkit'

import axios from 'axios'

export const getLayers = createAsyncThunk('map/layers/getLayers', async (params) => {
  const response = await axios.get('/api/chat/layers', { params })
  const data = await response.data

  return data
})

const layersAdapter = createEntityAdapter({})

export const { selectAll: selectLayers, selectById: selectLayerById } = layersAdapter.getSelectors(
  (state) => state.leaflet.layers
)

const layersSlice = createSlice({
  name: 'leaflet/layers',
  initialState: layersAdapter.getInitialState({
    basemapId: 'mapbox',
  }),
  reducers: {
    setBasemapId: (state, { payload }) => {
      state.basemapId = payload;
    },

    addLayers(state, { payload }) {
      layersAdapter.setAll(state, _.map(payload, values => ({id: nanoid(), ...values})))
    },
  },
  extraReducers: {
    [getLayers.fulfilled]: layersAdapter.setAll
  }
})

export const { setBasemapId, addLayers } = layersSlice.actions;

export const selectBasemapId = ({ leaflet }) => leaflet.layers.basemapId;

export const selectBasemap = createSelector([selectBasemapId, selectLayers], (basemapId, layers) => _.find(layers, {name: basemapId}))

export const selectBasemaps = createSelector([selectBasemapId, selectLayers], (basemapId, layers) => _.filter(layers, {baselayer: true})
  .map(v => ({...v, selected: basemapId === v.name})))

export default layersSlice.reducer
