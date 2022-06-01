import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { getMap, setMap } from './useMapStore'

export const getConfig = createAsyncThunk('leaflet/config/getConfig', async () => {
  return []
})

const initialState = {
  className: 'w-full h-full !z-10',
  loading: false,
  center: [16.81505795923194, 105.53466796875001],
  zoom: 6,
  zoomControl: false,
  attributionControl: true
}

const configSlice = createSlice({
  name: 'leaflet/config',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload
    },

    setCenter: (state, { payload }) => {
      state.center = payload
    },

    setBounds: (state, { payload }) => {
      state.bounds = payload
    },

    setView: (state, { payload }) => {
      state.center = payload.center
      state.zoom = payload.zoom
    },

    onMoveEnd: (state, { payload }) => {
      state.center = payload.center
      state.zoom = payload.zoom
    },

    reset: (state, { payload }) => _.defaultTo(payload, initialState),
  }
})

export const { setLoading, setBounds, onMoveEnd, reset } = configSlice.actions

export const setCenter = (center) => (dispatch) => getMap()?.panTo(center)

export const fitBounds = (bounds) => (dispatch) => getMap()?.fitBounds(bounds)

export const selectConfig = ({ leaflet }) => leaflet.config

export const selectLoading = (state) => selectConfig(state).loading

export const selectViewport = createSelector([selectConfig], (config) => _.pick(config, ['center', 'zoom']))

export const selectMapOptions = createSelector([selectConfig], (config) => {
  return {
    ...config,
    whenReady: ({ target }) => setMap(target)
  }
})

export default configSlice.reducer
