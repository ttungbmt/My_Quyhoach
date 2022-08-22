import create from "zustand-store-addons";
import {providers} from "@base/components/Search";
import mapService from 'app/services/mapService';
import {nanoid} from "@reduxjs/toolkit";
import history from '@history'
import {getMap} from "@redux-leaflet/store";
import {GeoJSON} from 'leaflet'

const getBounds = (geometry) => {
    return (new GeoJSON(geometry)).getBounds()
}

const handleError = (err) => {
    // if(err.status === undefined) console.info('Cancel previous request')
    // else console.error(err)
    console.warn(err)
}

const useThuadatStore = create((set, get) => ({
    feature: null,

    loading: false,
    abortController: null,

    setFeature: (feature) => set({ feature }),

    getByLocation: async (latlng) => {
        if(get().abortController) get().abortController.abort()

        let abortController = new AbortController()
        set({abortController, loading: true})

        try {
            const data = await mapService.getThuadatByLocation({location: latlng}, {signal: abortController.signal})
            get().handleResp(data)
        } catch (err){
            handleError(err)
        }
        set({loading: false})
    },

    getById: async (id) => {
        set({loading: true})

        try {
            const data = await mapService.getThuadatById(id ?? get().feature?.id)
            get().handleResp(data)
        } catch (err){
            handleError(err)
        }

        set({loading: false})
    },

    getThuadatByCoords: async (values) => {
        set({loading: true})
        history.push(`/maps/thong-tin-thua-dat`)

        try {
            const data = await mapService.getThuadatByCoords(values);
            get().handleResp(data)
        } catch (err){
            handleError(err)
        }

        set({loading: false})
    },

    getThuadatByInfo: async (values) => {
        set({loading: true})
        history.push(`/maps/thong-tin-thua-dat`)

        try {
            const data = await mapService.getThuadatByInfo(values);
            get().handleResp(data)
        } catch (err){
            handleError(err)
        }

        set({loading: false})
    },

    getByPlace: async (place_id) => {
        const {searchProvider} = get()

        set({loading: true})
        history.push(`/maps/thong-tin-thua-dat`)

        try {
            const result = await searchProvider.place({ place_id });
            const data = await mapService.getThuadatByLocation({ location: result.geometry.location });
            get().handleResp(data)
        } catch (err){
            handleError(err)
        }

        set({loading: false})
    },

    toggleFavorite: async (id) => {
        try {
            const data = await mapService.toggleFavorite(id);
            await get().getById()
        } catch (err){
            console.log(err)
            handleError(err)
        }
    },

    handleResp: (feature) => {
        set({feature})
        // if(getMap().getZoom() < 16) feature?.geometry && getMap().fitBounds(getBounds(feature.geometry))
        feature?.geometry && getMap().fitBounds(getBounds(feature.geometry))
        history.push(`/maps/thong-tin-thua-dat/${feature.id ?? ''}`)
    },
        // OLD ---------------------------------------------------------------------------------





    provider: 'meeymap',
    placeId: '',

    tabIndex: 0,
    setTabIndex: (index) => set({ tabIndex: index }),



    geometryId: null,
    setGeometry: (geometry) => set({ geometry, geometryId: nanoid() }),

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


}), {
    computed: {
        searchProvider: function (){
            return new providers[this.provider]()
        }
    }
});

export default useThuadatStore