import AbstractProvider, {RequestType} from './Provider'
import { isString } from 'lodash'

export default class OSMProvider extends AbstractProvider {
  constructor(options = {}) {
    super(options);

    const host = 'https://nominatim.openstreetmap.org';
    this.searchUrl = options.searchUrl || `${host}/search.php`;
    this.autosuggestUrl = options.autosuggestUrl || `${host}/search.php`;
    // this.geocodeUrl = options.geocodeUrl || `${host}/geocode`;
    this.placeUrl = options.placeUrl || `${host}/details.php`;
  }

  endpoint({ query, type }) {
    let params = query;

    switch (type) {
      case RequestType.GEOCODE:
        return this.getUrl(this.geocodeUrl, params);
      case RequestType.AUTOSUGGEST:
        if(isString(params)) params = {q: params, polygon_geojson: 1, format: 'jsonv2'}
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

    return result
  }
}