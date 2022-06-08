import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, nanoid } from '@reduxjs/toolkit'
import axios from 'axios'
import { selectLayerById } from '@redux-leaflet/store/layersSlice'
import { template } from 'lodash'

const popupsAdapter = createEntityAdapter({})

export const getPopups = createAsyncThunk('leaflet/popups/getPopups', async (items, { dispatch, getState }) => {

  dispatch(removeAll())

  dispatch(setLoading(true))


  try {
    let index = 0, popupRest = []

    for (let i of items) {
      const response = await axios.get(i.url).then(res => res.data)

      for (let j of response.features) {
        let layer = selectLayerById(getState(), i.layerId),
          rest = {
            ...i,
            properties: layer.popup.url ? {} : j.properties,
            id: nanoid()
          }

        if (layer.popup.url) {
          rest = {
            ...rest,
            url: template(layer.popup.url, { interpolate: /{([\s\S]+?)}/g })(j.properties),
            properties: {}
          }
        }

        if (index === 0) {
          if (layer.popup.url) {
            let data = await axios.get(rest.url).then(res => res.data)

            dispatch(addPopup({
              ...rest,
              properties: _.omit(data, ['geom', 'geometry'])
            }))

            _.set(window, `geomPopups.${rest.id}`, data.geom ?? data.geometry)

          } else {

            dispatch(addPopup(rest))

            _.set(window, `geomPopups.${rest.id}`, j.geometry)
          }

          dispatch(setSelectedId(rest.id))
          dispatch(setLoading(false))
        } else {

          popupRest.push(rest)
          _.set(window, `geomPopups.${rest.id}`, j.geometry)
        }

        index++
      }
    }

    popupRest.length && dispatch(addPopups(popupRest))
  } catch (err) {
    dispatch(setLoading(false))
    console.error(err)
  }
})

export const selectPopupsRoot = ({ leaflet }) => leaflet.popups

export const { selectAll } = popupsAdapter.getSelectors((state) => selectPopupsRoot(state))

const initialState = popupsAdapter.getInitialState({
  selectedId: null,
  loading: false
})

const popupsSlice = createSlice({
  name: 'leaflet/popups',
  initialState,
  reducers: {
    setLoading(state, { payload }) {
      state.loading = payload

      // if(payload) document.querySelector('.leaflet-container').style.setProperty('cursor', 'progress', 'important')
      // else document.querySelector('.leaflet-container').style.setProperty('cursor', 'inherit', 'important')
    },

    setSelectedId(state, { payload }) {
      state.selectedId = payload
    },

    setPopups: popupsAdapter.setAll,

    addPopups: popupsAdapter.addMany,

    addPopup: popupsAdapter.addOne,

    removeAll(state) {
      popupsAdapter.removeAll(state)
      _.set(window, `geomPopups`, {})
    }
  },
  extraReducers: {}
})

export const { setLoading, setPopups, addPopup, addPopups, removeAll, setSelectedId } = popupsSlice.actions

export const selectPopups = (state) => {
  let popups = selectAll(state)

  let layers = _.chain(popups).map('layerId').uniq().map(id => selectLayerById(state, id)).mapKeys('id').value()
  return _.map(popups, p => ({
    ..._.get(layers, `${p.layerId}.popup`),
    layerTitle: _.get(layers, `${p.layerId}.title`),
    ...p,
    geometry: _.get(window, `geomPopups.${p.id}`)
  }))
}

export const selectedId = state => selectPopupsRoot(state).selectedId

export const selectPopupSelected = createSelector([selectPopups, selectedId], (popups, selectedId) => {
  return _.find(popups, {id: selectedId})
})

export default popupsSlice.reducer