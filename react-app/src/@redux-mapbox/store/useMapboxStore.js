import create from 'zustand-store-addons'
import produce from 'immer'

const stateSlice = (set, get) => ({
  map: null,
  setMap: (map) => set({ map }),
});

const configSlice = (set, get) => ({
  config: {

  },

});

const layersSlice = (set, get) => ({

});

const useMapboxStore = create((set, get) => ({
  ...stateSlice(set, get),
  ...configSlice(set, get),
  ...layersSlice(set, get),
}), {
  computed: {
    mapOptions: function(){
      return {
        ...this.config,
      }
    }
  },
  watchers: {},
})

export const getMap = () => useMapboxStore.getState().map
export const setMap = useMapboxStore.getState().setMap

export default useMapboxStore