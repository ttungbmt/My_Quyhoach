import create from "zustand-store-addons";
import {providers} from "@base/components/Search";
import mapService from 'app/services/mapService';

const useThuadatStore = create((set, get) => ({
    tabIndex: 0,
    setTabIndex: (index) => set({ tabIndex: index }),

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

    placeOpen: false,
    setPlaceOpen: (placeOpen) => set({ placeOpen }),

    placeData: {},
    getPlace: async (place_id) => {
        const {searchProvider} = get()

        set({loading: true})

        const result = await searchProvider.place({ place_id });
        const thuadat = await mapService.getThuadatByLocation({ location: result.geometry.location });
        console.log(thuadat)
    },


    getThuadatByInfo: async (values) => {
        set({loading: true})

        const {data} = await mapService.getThuadatByInfo(values);
        console.log(data)
        set({loading: false})
    },

    getThuadatByCoords: async (values) => {
        set({loading: true})

        const {data} = await mapService.getThuadatByCoords(values);
        console.log(data)
        set({loading: false})
    },
}), {
    computed: {
        searchProvider: function (){
            return new providers[this.provider]()
        }
    }
});

export default useThuadatStore