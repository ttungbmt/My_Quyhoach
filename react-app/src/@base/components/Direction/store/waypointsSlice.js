import { createEntityAdapter, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { selectConfig } from '@redux-leaflet/store/configSlice'

const waypointsAdapter = createEntityAdapter({});

const waypointsSlice = createSlice({
  name: 'direction/waypoints',
  initialState: waypointsAdapter.getInitialState({

  }),
  reducers: {

    setWaypoints: (state, action) => {
      waypointsAdapter.setAll(state, action.payload)
    }
  },
})

export const selectWaypointsRoot = ({ direction }) => direction.waypoints

export const { selectAll: selectWaypoints, selectById: selectWaypointById } =
  waypointsAdapter.getSelectors((state) => state.direction.waypoints);



export const { setTravelModeId, setWaypoints } = waypointsSlice.actions

export default waypointsSlice.reducer