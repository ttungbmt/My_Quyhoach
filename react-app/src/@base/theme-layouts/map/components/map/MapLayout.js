import { styled } from '@mui/material/styles';
import withReducer from 'app/store/withReducer';
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'

import { selectMapOptions, setCenter } from '@redux-leaflet/store/configSlice'
import { selectBasemap, selectOverlays } from '@redux-leaflet/store/layersSlice'
import { MapEvents, updateMapSize, reducer, OnChangeBounds } from '@redux-leaflet'
import MapRoutes from '@base/components/Direction/MapRoutes'
import { selectPlace } from '@base/components/Search/store/placeSlice'
import { useUpdateEffect } from 'react-use'

const Root = styled('div')(({ theme, opened }) => ({
  height: '100%'
}));

function MapLayout(props) {
  const dispatch = useDispatch()
  const { loading, bounds, ...mapOptions } = useSelector(selectMapOptions)
  const basemap = useSelector(selectBasemap)
  const overlays = useSelector(selectOverlays)
  const [mapRef, DOMRect] = updateMapSize()
  const place  = useSelector(selectPlace)

  useUpdateEffect(() => {
    place?.latLng && dispatch(setCenter(place?.latLng))
  }, [JSON.stringify(place?.latLng)])

  return (
    <Root ref={mapRef}>
      {DOMRect && loading && (
        <MapContainer {...mapOptions}>
          <OnChangeBounds bounds={bounds}/>
          <MapEvents />
          {/*<ZoomControl position="bottomright"/>*/}

          {basemap && (<TileLayer key={basemap.id} {...basemap} />)}

          {overlays?.map(({component: Component, id, ...props}) => (
            <Component key={id} {...props}/>
          ))}

          <MapRoutes />
        </MapContainer>
      )}
    </Root>
  );
}

export default withReducer('leaflet', reducer)(memo(MapLayout));
