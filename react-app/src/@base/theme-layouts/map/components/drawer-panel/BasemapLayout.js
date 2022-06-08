import DrawerPage from '@base/components/DrawerPage'
import { Box, Card, Stack } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { styled } from '@mui/material/styles'
import clsx from 'clsx'
import { selectBasemaps, setBasemapId } from '@redux-leaflet/store/layersSlice'
import { selectViewport } from '@redux-leaflet/store/configSlice'
import { useDeepCompareEffect } from 'react-use'
import MySvgIcon from '@base/components/MySvgIcon'
import { useTranslation } from 'react-i18next'

const Root = styled(DrawerPage)(({ theme, ...props }) => ({
  '& .FusePageSimple-contentWrapper': {
    backgroundColor: theme.palette.background.default,
  },

  '& .map-item': {
    position: 'relative',
    height: 104,

    '&.active': {
      border: `2px solid ${theme.palette.secondary.main}`,
    }
  },

  '& .map-item-text': {
    backgroundColor: '#ffffffd9'
  }
}));

function ViewportChanged({center, zoom}){
  const map = useMap()
  useDeepCompareEffect(() => {
    map.setView(center, zoom)
  }, [center, zoom])
  return null
}

function BasemapLayout({ heading }) {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const viewport = useSelector(selectViewport)
  const baselayers = useSelector(selectBasemaps)

  const mapOptions ={
    className: 'h-full w-full z-10 !cursor-pointer',
    center: viewport.center,
    zoom: viewport.zoom >= 3 ? viewport.zoom - 3 : viewport.zoom,
    zoomControl: false,
    attributionControl: false,
    scrollWheelZoom: false,
    dragging: false
  }

  console.log(1111)

  return (
    <Root
      heading={t(heading)}
      content={(
        <Stack spacing={2} className="w-full">
          {baselayers.map((l, k) => (
            <Card key={l.id} className={clsx("map-item relative cursor-pointer", {active: l.selected})} onClick={() => dispatch(setBasemapId(l.name))}>
              <MapContainer {...mapOptions}>
                <ViewportChanged {..._.pick(mapOptions, ['center', 'zoom'])}/>
                <TileLayer {...l}/>
              </MapContainer>
              <Box className="map-item-text absolute px-6 py-4 font-semibold rounded-lg bottom-6 left-6 z-20">{l.title}</Box>
            </Card>
          ))}
        </Stack>
      )}
    />
  )
}

BasemapLayout.defaultProps = {
  heading: 'Bản đồ nền',
  icon: <MySvgIcon className="fa-light fa-layer-group"/>,
  drawerProps: {
    anchor: 'right',
    width: 220,
    variant: 'persistent'
  }
}


export default BasemapLayout