import { styled } from '@mui/material/styles';
import withReducer from 'app/store/withReducer';
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'

import { selectMapOptions, setCenter } from '@redux-leaflet/store/configSlice'
import {selectBasemap, selectOverlaysSelected} from '@redux-leaflet/store/layersSlice'
import { MapEvents, updateMapSize, reducer, OnChangeBounds, LocateControl } from '@redux-leaflet'
import MapRoutes from '@base/components/Direction/MapRoutes'
import { selectPlace } from '@base/components/Search/store/placeSlice'
import { useUpdateEffect } from 'react-use'
import ThuadatWMS from "@base/theme-layouts/map/components/map/ThuadatWMS";
import BasemapControl from './BasemapControl'
import SliderControl from "@base/theme-layouts/map/components/map/SliderControl";

const Root = styled('div')(({ theme, opened }) => ({
  height: '100%'
}));

function MapLayout(props) {
  const dispatch = useDispatch()
  const { loading, bounds, ...mapOptions } = useSelector(selectMapOptions)
  const basemap = useSelector(selectBasemap)
  const overlays = useSelector(selectOverlaysSelected)
  const [mapRef, DOMRect] = updateMapSize()
  const place  = useSelector(selectPlace)

  useUpdateEffect(() => {
    place?.latLng && dispatch(setCenter(place?.latLng))
  }, [JSON.stringify(place?.latLng)])

  return (
    <Root ref={mapRef}>
      {DOMRect && loading && (
        <>
          <BasemapControl />
          <SliderControl />

          <MapContainer {...mapOptions}>
            <OnChangeBounds bounds={bounds}/>
            <MapEvents />
            {/*<ZoomControl position="bottomright"/>*/}

            {basemap && (<TileLayer key={basemap.id} {...basemap}/>)}

            {overlays?.map(({component: Component, id, ...props}) => (
                <Component key={id} maxZoom={22} {...props}/>
            ))}

            <LocateControl position="bottomright" flyTo icon="fa-solid fa-location-crosshairs text-[17px]"/>
            <ZoomControl position="bottomright"/>

            <MapRoutes />
            <ThuadatWMS />

          </MapContainer>
        </>
      )}
    </Root>
  );
}

export default withReducer('leaflet', reducer)(memo(MapLayout));
