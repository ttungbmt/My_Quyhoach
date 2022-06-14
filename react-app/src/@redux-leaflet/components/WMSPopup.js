import { useDispatch, useSelector } from 'react-redux'
import { GeoJSON, useMapEvents } from 'react-leaflet'
import { selectOverlaysPopups } from '../store/layersSlice'
import L from 'leaflet'
import { getPopups, selectPopupSelected } from '@redux-leaflet/store/popupsSlice'

function WMSPopup(){
  const popSelected = useSelector(selectPopupSelected)

  const dispatch = useDispatch()
  const overlays = useSelector(selectOverlaysPopups)

  const map = useMapEvents({
    click({ latlng }) {
      let popups = []

      _.map(overlays, o => {
        popups.push({
          url: getUrlLayer(latlng, map, o),
          layerId: o.id,
          locationClicked: [latlng.lat, latlng.lng]
        })
      })

      dispatch(getPopups(popups))
    },
  });


  if(popSelected) {
    console.log(popSelected)
    return <GeoJSON data={popSelected.geometry}/>
  }

  return null
}

const getUrlLayer = (latlng, map, layer) => {
  let point = map.latLngToContainerPoint(latlng, map.getZoom()),
    size = map.getSize(),
    wmsParams = _.merge({
      styles: '',
      transparent: true,
      version: '1.1.1',
      format: 'image/png',
      layers: '',
    }, _.pick(layer, [
      'url', 'styles', 'transparent', 'version', 'format', 'layers'
    ])),
    params = {
      request: 'GetFeatureInfo',
      service: 'WMS',
      srs: 'EPSG:4326',
      styles: wmsParams.styles,
      transparent: wmsParams.transparent,
      version: wmsParams.version,
      format: wmsParams.format,
      bbox: map.getBounds().toBBoxString(),
      height: size.y,
      width: size.x,
      layers: wmsParams.layers,
      query_layers: wmsParams.layers,
      info_format: 'application/json',
      feature_count: 10
    }

  params[params.version === '1.3.0' ? 'i' : 'x'] = Math.round(point.x)
  params[params.version === '1.3.0' ? 'j' : 'y'] = Math.round(point.y)

  if (wmsParams.cql_filter) params.cql_filter = wmsParams.cql_filter

  return wmsParams.url + L.Util.getParamString(params, wmsParams.url, true)
}

export default WMSPopup