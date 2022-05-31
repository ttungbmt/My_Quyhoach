import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash'

const dataSlice = createSlice({
  name: 'sidePanel/data',
  initialState: {

  },
  reducers: {
    addDataSidePanel: (state, { payload }) => {
      _.map(payload, (data, key) => state[key] = data)
    },
  },
});

export const { addDataSidePanel } = dataSlice.actions;

export const selectSidePanelData = ({ sidePanel }) => sidePanel.data;

export default dataSlice.reducer;
