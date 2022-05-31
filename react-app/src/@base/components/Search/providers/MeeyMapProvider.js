import AbstractProvider, {RequestType} from './Provider'
import {isString, castArray} from 'lodash'

export default class MeetMapProvider extends AbstractProvider {
    constructor(options = {}) {
        super(options);

        const host = 'https://api.meeymap.com/map/v1';
        this.searchUrl = options.searchUrl || `${host}/search`;
        this.autosuggestUrl = options.autosuggestUrl || `${host}/suggest-places`;
        this.geocodeUrl = options.geocodeUrl || `${host}/geocode`;
        this.placeUrl = options.placeUrl || `${host}/place-detail-by-id`;
    }

    endpoint({ query, type }) {
        let params = query;

        switch (type) {
            case RequestType.GEOCODE:
                return this.getUrl(this.geocodeUrl, params);
            case RequestType.AUTOSUGGEST:
                if(isString(params)) params = {keyword: params}
                return this.getUrl(this.autosuggestUrl, params);
            case RequestType.PLACE:
                if(isString(params)) params = {placeId: params}
                return this.getUrl(this.placeUrl, params);
            default:
                if(isString(params)) params = {address: params}
                return this.getUrl(this.searchUrl, params);
        }
    }

    parse(response, type) {
        const result = response.data;
        if(type === RequestType.AUTOSUGGEST){
            return result.data.map(r => ({place_id: r.place_id, name: r.name, main_text: r.main_text, secondary_text: r.secondary_text}))
        }

        return result.data
    }
}