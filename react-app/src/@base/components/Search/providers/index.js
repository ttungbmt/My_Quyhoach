export { default as Map4DProvider } from './Map4DProvider';
export { default as CocCocProvider } from './CocCocProvider';
export { default as MeeyMapProvider } from './MeeyMapProvider';
export { default as OSMProvider } from './OSMProvider';
export { default as Provider } from './Provider';

import Map4DProvider from './Map4DProvider'
import CocCocProvider from './CocCocProvider'
import MeeyMapProvider from './MeeyMapProvider'
import OSMProvider from './OSMProvider'

export const providers = {
    map4d: Map4DProvider,
    cococ: CocCocProvider,
    meeymap: MeeyMapProvider,
    osm: OSMProvider,
}
