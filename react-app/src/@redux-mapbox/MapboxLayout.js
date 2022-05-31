import { memo, useCallback, useEffect, useRef } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import Map from 'react-map-gl'
import { useDispatch, useSelector } from 'react-redux'
import withReducer from 'app/store/withReducer'
import reducer from './store'

import { selectMapOptions, setZoom, setViewState } from './store/configSlice'

function useMapOptions() {
  const dispatch = useDispatch()
  const mapOptions = useSelector(selectMapOptions)
  const onMoveEnd = useCallback(({ viewState }) => {
    dispatch(setViewState(viewState))
  }, [])

  return { ...mapOptions, onMoveEnd }
}

function MapboxLayout() {
  const dispatch = useDispatch()
  const mapRef = useRef()
  const mapOptions = useMapOptions()

  useEffect(() => {
    setTimeout(() => {
      // console.log(mapRef)
      // dispatch(setCenter([16.81505795923194, 105.53466796875001]))
      // dispatch(setZoom(15))
    }, 2000)
  }, [])

  return (
    <Map
      ref={mapRef}
      {...mapOptions}
    />
  )
}

export default withReducer('mapbox', reducer)(memo(MapboxLayout))