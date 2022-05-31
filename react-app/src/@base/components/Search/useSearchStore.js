import create from "zustand-store-addons";
import {providers} from "./providers";
import {useMapStore} from '@redux-leaflet'

// https://thuduc-maps.hcmgis.vn/thuducserver/gwc/service/wmts?layer=thuduc:thuduc_maps&style=&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png&TileMatrix=EPSG:900913:12&TileCol=3259&TileRow=1921

// const providers = [
//     {key: 'meeymap', url: 'https://api.meeymap.com/map/v1/suggest-places?keyword=406/60/36'},
//     {key: 'coccoc', url: 'https://map.coccoc.com/en/map/search.json?query=406/60/36&suggestions=true&borders=10.673571111111,106.49169416667,10.897621,106.831741&pos=10.7776331,106.7116815&pos_accuracy=2123.016983495681'},
//     {key: 'map4d', url: 'https://api-app.map4d.vn/map/autosuggest?key=208e1c99aa440d8bc2847aafa3bc0669&datetime=1652925965872&text=406&location=10.832599939332312,106.65810000000002'},
// ]

const useSearchStore = create((set, get) => ({
    provider: 'meeymap',
    placeId: '',
    loading: false,

    query: '',
    setQuery: (query) => set({ query }),

    resetAll: () => {
        set({
            query: '',
            searchData: {},
            autoSuggestData: {},
            geocodeData: {},
            placeOpen: false,
            placeData: {},
        })
    },

    searchData: {},
    search: async () => {
        const {query, searchProvider} = get()

        set({loading: true})

        if(query.length > 1) {
            const results = await searchProvider.search({ query });
            set({searchData: results})
        } else {
            set({searchData: []})
        }

        set({loading: false})
    },

    autoSuggestData: {},
    autoSuggest: async () => {
        const {query, searchProvider} = get()

        set({loading: true})

        if(query.length > 1) {
            const results = await searchProvider.autoSuggest({ query });
            set({autoSuggestData: results})
        } else {
            set({autoSuggestData: []})
        }

        set({loading: false})
    },

    geocodeData: {},
    geocode: async () => {

    },

    placeOpen: false,
    setPlaceOpen: (placeOpen) => set({ placeOpen }),
    placeData: {},
    getPlace: async (place_id) => {
        const {searchProvider} = get()

        set({loading: true})

        const result = await searchProvider.place({ place_id });
        set({placeData: result, loading: false, placeOpen: true})

        const mapState = useMapStore.getState()
        mapState.fitBounds(result.geometry.bounds)
    }
}), {
    computed: {
        searchProvider: function (){
            return new providers[this.provider]()
        }
    }
});

export default useSearchStore