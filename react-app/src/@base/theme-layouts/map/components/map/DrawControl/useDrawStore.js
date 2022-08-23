import create from "zustand-store-addons";

const useDrawStore = create((set, get) => ({
    layers: [],
    popupId: null,

    addLayer: (layer) => set({ layers: [...get().layers, layer] }),
    removeLayer: (id) => set({ layers: get().layers.filter(layer => layer._leaflet_id === id) }),
    clearAllLayers: () => set({ layers: [] }),
    setPopupId: (id) => set({ popupId: id }),
}))

export default useDrawStore
