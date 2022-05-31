import _ from 'lodash'

export {default as createDebouncedAsyncThunk} from './createDebouncedAsyncThunk'

export const assets = (path) => process.env.PUBLIC_URL + '/' + path

export const env = (key, _default) => _.defaultTo(process.env[`REACT_APP_${key}`], _default)