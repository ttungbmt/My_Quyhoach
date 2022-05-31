import { createSelector, createSlice } from '@reduxjs/toolkit'
import { getMap, setMap } from './useMapStore'

const initialState = {
  className: 'w-full h-full !z-10',
  center: [16.81505795923194, 105.53466796875001],
  zoom: 6,
  zoomControl: false
}

const configSlice = createSlice({
  name: 'leaflet/config',
  initialState,
  reducers: {
    setCenter: (state, { payload }) => {
      state.center = payload
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

export const { onMoveEnd, reset } = configSlice.actions

export const setCenter = (center) => (dispatch, getState, api) => {
  getMap().panTo(center)
  dispatch(configSlice.actions.setCenter(center))
}

export const selectConfig = ({ leaflet }) => leaflet.config

export const selectViewport = createSelector([selectConfig], (config) => _.pick(config, ['center', 'zoom']))

export const selectMapOptions = createSelector([selectConfig], (config) => {
  return {
    ...config,
    whenReady: ({ target }) => setMap(target)
  }
})

export default configSlice.reducer
