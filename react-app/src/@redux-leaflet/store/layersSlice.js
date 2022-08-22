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
      layersAdapter.addMany(state, _.map(payload, values => ({
        id: nanoid(),
        ...values,
        popup: parsePopup(values.popup)
      })))
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
    },

    setTransparency(state, { payload }){
      _.filter(state.entities, e => _.includes(['tddo:v_quyhoach', 'tddo:quyhoach_2030'], e.layers)).map(e => {
        e.opacity = payload.opacity
      })
    },

    toggleLayer(state, { payload }){
      _.filter(state.entities, e => e.layers === 'tddo:quyhoach_2030').map(e => {
        e.selected = !e.selected
      })
    },
  },
  extraReducers: {
    [getLayers.fulfilled]: layersAdapter.setAll
  }
})

export const { setBasemapId, addBaseLayers, addLayers, setTransparency, toggleLayer } = layersSlice.actions;

export const selectBasemapId = ({ leaflet }) => leaflet.layers.basemapId;

export const selectBasemap = createSelector([selectBasemapId, selectLayers], (basemapId, layers) => _.find(layers, {name: basemapId}))

export const selectBasemaps = createSelector([selectBasemapId, selectLayers], (basemapId, layers) => {
  return _.filter(layers, {baselayer: true}).map(v => ({...v, selected: basemapId === v.name}))
})

export const selectOverlays = createSelector([selectLayers], (layers) => {
  return _.filter(layers, l => !l.baselayer)
})

export const selectOverlaysSelected = createSelector([selectOverlays], (layers) => {
  return _.filter(layers, {selected: true}).map(l => {
    return {
      component: (props) => {
        if(props.type === 'wmts') {
          if(props.layers) return <TileLayer {...props} url={`/geoserver/gwc/service/wmts?layer=${props.layers}&style=&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}`} format="image/png"/>
          return <TileLayer {...props}/>
        }

        if(props.type === 'xyz') return <TileLayer {...props}/>

        if(props.type === 'wms') return <WMSTileLayer transparent={true} format="image/png" {...props}/>

        return null
      },
      ...l
    }
  })
})

const parsePopup = (pop) => {
  if(_.isBoolean(pop)) return {enabled: pop}

  return {
    enabled: true,
    ...pop
  }
}

export const selectOverlaysPopups = createSelector([selectOverlays], (layers) => {
  return _.orderBy(_.filter(layers.map(l => ({zIndex: 0, ...l})), l => l.selected == true && l.popup.enabled), ['zIndex'], ['desc'])
})

export default layersSlice.reducer
