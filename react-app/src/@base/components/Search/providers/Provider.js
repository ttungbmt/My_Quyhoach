
export const RequestType = {
    SEARCH: 'SEARCH',
    AUTOSUGGEST: 'AUTOSUGGEST',
    GEOCODE: 'GEOCODE',
    PLACE: 'PLACE',
}

export default class AbstractProvider {
    searchUrl;
    autosuggestUrl;
    geocodeUrl;
    placeUrl;

    constructor(options = {}) {
        this.options = options;
    }

    getParamString(params = {}) {
        const set = { ...this.options.params, ...params };
        return Object.keys(set)
            .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(set[key])}`,)
            .join('&');
    }

    getUrl(url, params) {
        return `${url}?${this.getParamString(params)}`;
    }

    endpoint({ query, type }) {
        const params = typeof query === 'string' ? { query } : query;
        // params.format = 'json';

        switch (type) {
            case RequestType.GEOCODE:
                return this.getUrl(this.geocodeUrl, params);
            case RequestType.AUTOSUGGEST:
                return this.getUrl(this.autosuggestUrl, params);
            case RequestType.PLACE:
                return this.getUrl(this.placeUrl, params);
            default:
                return this.getUrl(this.searchUrl, params);
        }
    }

    async search(options) {
        const url = this.endpoint({
            query: options.query,
            type: RequestType.SEARCH,
        });

        const request = await fetch(url);
        const json = await request.json();
        return this.parse({ data: json });
    }

    async autoSuggest(options) {
        const url = this.endpoint({
            query: options.query,
            type: RequestType.AUTOSUGGEST,
        });

        const request = await fetch(url);
        const json = await request.json();
        return this.parse({ data: json }, RequestType.AUTOSUGGEST);
    }

    async place(options) {
        const url = this.endpoint({
            query: options.place_id,
            type: RequestType.PLACE,
        });

        const request = await fetch(url);
        const json = await request.json();
        return this.parse({ data: json }, RequestType.PLACE);
    }
}