import flip from '@turf/flip'
import {getCoords} from '@turf/invariant'

export const geomToLatLngs = (geom) => getCoords(flip(geom))