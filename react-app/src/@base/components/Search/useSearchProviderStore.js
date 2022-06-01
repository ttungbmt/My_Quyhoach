import create from "zustand-store-addons";
import {providers} from "./providers";
import {models} from "./models";
import { env } from '@base/utils'

const useSearchProviderStore = create((set, get) => ({
  provider: env('MAP_SEARCH_PROVIDER', 'meeymap'),

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