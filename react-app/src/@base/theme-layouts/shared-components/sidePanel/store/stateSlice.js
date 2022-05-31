import { createSlice } from '@reduxjs/toolkit';

const stateSlice = createSlice({
  name: 'sidePanel/state',
  initialState: { open: false, name: null },
  reducers: {
    toggleSidePanel: {
      reducer: (state, { payload }) => {
        state.open = !state.open
        state.name = payload
      },
      prepare: (name = null) => ({ payload: name })
    },
    openSidePanel: {
      reducer: (state, { payload }) => {
        state.open = true
        state.name = payload
      },
      prepare: (name = null) => ({ payload: name })
    },
    closeSidePanel: (state, action) => {
      state.open = false
    },
  },
});

export const { toggleSidePanel, openSidePanel, closeSidePanel } = stateSlice.actions;

export const selectSidePanelState = ({ sidePanel }) => sidePanel.state;

export default stateSlice.reducer;
