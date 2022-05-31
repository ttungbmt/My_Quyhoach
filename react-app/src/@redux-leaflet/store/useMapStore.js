import create from 'zustand-store-addons'
import produce from 'immer'

const stateSlice = (set, get) => ({
  map: null,
  setMap: (map) => set({ map }),
});

const configSlice = (set, get) => ({
  config: {
    className: 'w-full h-full',
    center: [16.56249250837488, 106.08398437500001],
    zoom: 8,
    zoomControl: false
  },

  setCenter: (center) => {
    get().map.panTo(center)

    set(produce(state => {
      state.config.center = center
    }))
  },

  setView: (center, zoom) => {
    get().map.setView(center, zoom)

    set(produce(state => {
      state.config.center = center
      state.config.zoom = zoom
    }))
  },

  onMoveEnd: ({target}) => set(produce(state => {
    state.config.center = target.getCenter()
    state.config.zoom = target.getZoom()
  }))
});

const layersSlice = (set, get) => ({

});

const useMapStore = create((set, get) => ({
  ...stateSlice(set, get),
  ...configSlice(set, get),
  ...layersSlice(set, get),
}), {
  computed: {
    mapOptions: function(){
      return {
        ...this.config,
        whenReady: ({target}) => this.setMap(target)
      }
    }
  },
  watchers: {},
})

export const getMap = () => useMapStore.getState().map
export const setMap = useMapStore.getState().setMap

export default useMapStore