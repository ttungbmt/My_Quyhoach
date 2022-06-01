import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import {nanoid} from '@reduxjs/toolkit'
import _ from '@lodash'
import baselayers from '../fixtures/baselayers.json'

import axios from 'axios'
import { TileLayer, WMSTileLayer } from 'react-leaflet'

export const getLayers = createAsyncThunk('map/layers/getLayers', async (params) => {
  const response = await axios.get('/api/chat/layers', { params })
  const data = await response.data

  return data
})

const layersAdapter = createEntityAdapter({})

export const { selectAll: selectLayers, selectById: selectLayerById } = layersAdapter.getSelectors(
  (state) => state.leaflet.layers
)
const initialBaseLayers = _.filter(baselayers, l => _.includes(['mapbox', 'osm'], l.name)).map(l => ({id: l.name, baselayer: true, ...l}))

const initialState = layersAdapter.upsertMany(layersAdapter.getInitialState({
  basemapId: 'mapbox',
}), initialBaseLayers);

const layersSlice = createSlice({
  name: 'leaflet/layers',
  initialState,
  reducers: {
    setBasemapId: (state, { payload }) => {
      state.basemapId = payload;
    },

    addLayers(state, { payload }) {
      layersAdapter.addMany(state, _.map(payload, values => ({id: nanoid(), ...values})))
    },

    addBaseLayers(state, { payload }){
      let layers = []

      _.map(payload, name => {
        if(_.isString(name)) {
          let l = _.find(baselayers, {name})

          if(l) layers.push(l)
          else console.warn(`Not found basemap (${name})`)

        } else {
          layers.push(name)
        }
      })

      layersAdapter.setAll(state, _.map(layers, l => ({id: l.name ?? nanoid(), type: l.type ?? 'xyz', baselayer: true, ...l})))
    }
  },
  extraReducers: {
    [getLayers.fulfilled]: layersAdapter.setAll
  }
})

export const { setBasemapId, addBaseLayers, addLayers } = layersSlice.actions;

export const selectBasemapId = ({ leaflet }) => leaflet.layers.basemapId;

export const selectBasemap = createSelector([selectBasemapId, selectLayers], (basemapId, layers) => _.find(layers, {name: basemapId}))

export const selectBasemaps = createSelector([selectBasemapId, selectLayers], (basemapId, layers) => {
  return _.filter(layers, {baselayer: true}).map(v => ({...v, selected: basemapId === v.name}))
})

export const selectOverlays = createSelector([selectLayers], (layers) => {
  return _.filter(layers, l => !l.baselayer).map(l => {
    return {
      component: (props) => {
        if(props.type === 'wmts') {
          if(props.layers) return <TileLayer {...props} url={`/geoserver/gwc/service/wmts?layer=${props.layers}&style=&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}`} format="image/png"/>
          return <TileLayer {...props}/>
        }

        if(props.type === 'wms') return <WMSTileLayer transparent={true} format="image/png" {...props}/>

        return null
      },
      ...l
    }
  })
})

export default layersSlice.reducer
