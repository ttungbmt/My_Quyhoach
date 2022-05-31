import create from "zustand-store-addons";
import {providers} from "./providers";
import {models} from "./models";

const useSearchProviderStore = create((set, get) => ({
  provider: 'osm',

  searchProvider: function (params){
    return new providers[this.provider](params)
  },
  modelProvider: function(params){
    return new models[this.provider](params)
  }
}), {
  computed: {

  }
});

export const searchProvider = (params) => useSearchProviderStore.getState().searchProvider(params)
export const modelProvider = (params) => useSearchProviderStore.getState().modelProvider(params)
export const setProvider = (name) => useSearchProviderStore.setState({provider: name})

export default useSearchProviderStore