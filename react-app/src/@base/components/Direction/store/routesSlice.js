import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice, nanoid
} from '@reduxjs/toolkit'
import { selectWaypoints, selectWaypointsRoot } from '@base/components/Direction/store/waypointsSlice'
import axios from 'axios'
import moment from 'moment'

const routesAdapter = createEntityAdapter({});

export const getRoutes = createAsyncThunk('direction/getRoutes', async (waypoints, {getState}) => {
  const travelMode = selectTravelModeId(getState())

  let waypointsStr = _.map(waypoints, v => v.location.reverse().join(',')).join(';')

  const result = await axios.get(`https://routing.openstreetmap.de/routed-${travelMode}/route/v1/driving/${waypointsStr}`, {
    params: {
      overview: false,
      alternatives: true,
      steps: true
    }
  });

  // const result = await axios.get(`https://routing.openstreetmap.de/routed-car/route/v1/driving/106.70444631794913,10.7718607;106.7220409,10.7949426;106.6598663,10.800764?overview=false&alternatives=true&steps=true`);

  return result.data
});

export const searchRoutes = () => (dispatch, getState, api) => {
  setTimeout(() => {
    let waypoints = _.cloneDeep(selectWaypoints(getState()).filter(v => v.location))

    if(waypoints.length >= 2) {
      dispatch(getRoutes(waypoints))
    }

  }, 500)
}


const routesSlice = createSlice({
  name: 'direction/routes',
  initialState: routesAdapter.getInitialState({
    travelModeId: 'car',

    travelModes: [
      {iconClass: 'fa-solid fa-person-walking text-[18px] text-gray-300', mode: 'foot', title: 'Đi bộ'},
      {iconClass: 'fa-solid fa-motorcycle text-[18px] text-gray-300', mode: 'bike', title: 'Xe máy'},
      {iconClass: 'fa-solid fa-car text-[18px] text-gray-300', mode: 'car', title: 'Ô tô'},
      // {iconClass: 'fa-solid fa-truck-front text-[18px] text-gray-300', mode: 'lorry', title: 'Xe tải'},
      // {iconClass: 'fa-solid fa-bus-simple text-[18px] text-gray-300', mode: 'bus', title: 'Xe buýt'},
    ],

    stepSelected: null,

    routes: [],

    waypoints: []
  }),
  reducers: {
    setTravelModeId: (state, {payload}) => {
      state.travelModeId = payload
    },

    setStepSelected: (state, {payload}) => {
      state.stepSelected = payload
    }
  },
  extraReducers: {
    [getRoutes.fulfilled]: (state, { payload }) => {
      state.routes = payload.routes
      state.waypoints = payload.waypoints
    },
  }
})

export const selectRoutesRoot = ({ direction }) => direction.routes

export const selectTravelModeId = ({ direction }) => direction.routes.travelModeId

export const selectTravelModes = createSelector([selectRoutesRoot, selectTravelModeId], (routesRoot, travelModeId) => {
  return _.map(routesRoot.travelModes, v => ({...v, selected: v.mode === travelModeId}))
})

export const selectStepSelected = ({ direction }) => direction.routes.stepSelected

export const selectMainRoute = createSelector([selectRoutesRoot, selectTravelModeId], (routesRoot) => {
  let mainRoute = routesRoot.routes[0]

  if(!mainRoute) return null

  return {
    ...routesRoot.routes[0],
    distanceText: convertDistance(routesRoot.routes[0]?.distance),
    durationText: convertHM(routesRoot.routes[0]?.duration),
  }
})

const convertHM = (duration) => {
  let hours = _.toInteger(moment().startOf('day').seconds(duration).format('H')),
      minutes = _.toInteger(moment().startOf('day').seconds(duration).format('m'))

  if(hours > 0 && minutes > 0) return `${hours} g ${minutes} ph`
  if(hours > 0) return `${hours} g`
  if(minutes > 0) return `${minutes} ph`

  return 'None'
}

const convertDistance = (distance) => {
  let dkm = distance/1000
  if(dkm > 1) return dkm.toFixed(1) + ' km'
  return distance + ' m'
}

export const { setTravelModeId, setStepSelected } = routesSlice.actions

export default routesSlice.reducer