import { createSelector, createSlice } from '@reduxjs/toolkit'
import { getMap, setMap } from './useMapboxStore'

const initialViewState = {
  latitude: 16.81505795923194,
  longitude: 105.53466796875001,
  zoom: 5,
}

const initialState = {
  className: 'w-full h-full !z-10',
  initialViewState,
  viewState: initialViewState,
  mapStyle: 'mapbox://styles/mapbox/streets-v11',
  mapboxAccessToken: process.env.REACT_APP_MAP_KEY
}

const configSlice = createSlice({
  name: 'map/config',
  initialState,
  reducers: {
    setViewState: (state, {payload}) => {
      state.viewState = payload
    },

    setCenter: (state, { payload }) => {
      state.viewState.latitude = payload[0]
      state.viewState.longitude = payload[1]
    },

    setZoom: (state, { payload }) => {
      state.viewState.zoom = payload
    },

    reset: (state, { payload }) => _.defaultTo(payload, initialState),
  }
})

export const { setViewState, reset } = configSlice.actions

export const setCenter = (center) => (dispatch) => {
  const _center = center.reverse()
  getMap().setCenter(_center)
}

export const setZoom = (zoom) => (dispatch) => {
  getMap().setZoom(zoom)
}

export const selectConfig = ({ mapbox }) => mapbox.config

export const selectViewport = createSelector([selectConfig], (config) => _.pick(config, ['center', 'zoom']))

export const selectMapOptions = createSelector([selectConfig], (config) => {
  return {
    ..._.omit(config, ['viewState']),

    onLoad: ({ target }) => setMap(target)
  }
})

export default configSlice.reducer
