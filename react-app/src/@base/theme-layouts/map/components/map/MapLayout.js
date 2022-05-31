import { styled } from '@mui/material/styles';
import withReducer from 'app/store/withReducer';
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'

import { selectMapOptions, setCenter } from '@redux-leaflet/store/configSlice'
import { selectBasemap } from '@redux-leaflet/store/layersSlice'
import { MapEvents, updateMapSize, reducer } from '@redux-leaflet'
import MapRoutes from '@base/components/Direction/MapRoutes'
import { selectPlace } from '@base/components/Search/store/placeSlice'
import { useUpdateEffect } from 'react-use'

const Root = styled('div')(({ theme, opened }) => ({
  height: '100%'
}));

function MapLayout(props) {
  const dispatch = useDispatch()
  const mapOptions = useSelector(selectMapOptions)
  const basemap = useSelector(selectBasemap)
  const [mapRef, DOMRect] = updateMapSize()
  const place  = useSelector(selectPlace)

  useUpdateEffect(() => {
    place?.latLng && dispatch(setCenter(place?.latLng))
  }, [JSON.stringify(place?.latLng)])

  return (
    <Root ref={mapRef}>
      {DOMRect && (
        <MapContainer {...mapOptions}>
          <MapEvents />
          {/*<ZoomControl position="bottomright"/>*/}

          {basemap && (<TileLayer key={basemap.id} {...basemap} />)}

          <MapRoutes />
        </MapContainer>
      )}
    </Root>
  );
}

export default withReducer('leaflet', reducer)(memo(MapLayout));
