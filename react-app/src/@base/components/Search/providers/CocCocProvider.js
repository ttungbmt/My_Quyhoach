import AbstractProvider from "./Provider";

export default class CocCocProvider extends AbstractProvider {
    constructor(options = {}) {
        super(options);

        const host = 'https://map.coccoc.com/en/map';
        this.searchUrl = options.searchUrl || `${host}/search.json`;
        this.autosuggestUrl = options.autosuggestUrl || `${host}/search.json`;
        this.placeUrl = options.placeUrl || `${host}/poidata.json`;
    }
}
