import { useSelector } from 'react-redux'
import { decode } from "@googlemaps/polyline-codec";
import { Marker, Polyline } from 'react-leaflet'
import { selectMainRoute, selectStepSelected } from './store/routesSlice'
import { selectWaypoints } from './store/waypointsSlice'
import { memo } from 'react'
import L from 'leaflet'

function MapRoutes(){
  const mainRoute = useSelector(selectMainRoute)
  const stepSelected = useSelector(selectStepSelected)
  const waypoints = useSelector(selectWaypoints)

  if(!mainRoute) return null


  return (
    <>

      {stepSelected && (
        <Marker
          position={stepSelected.location}
          icon={L.ExtraMarkers.icon({
            icon: 'fa-solid fa-circle !text-[10px] !mt-[10px]',
            markerColor: 'cyan',
            shape: 'circle',
          })} />
      )}

      {waypoints.map((wp, k) => (
        <Marker
          key={k}
          position={wp.location}
          icon={L.ExtraMarkers.icon({
            icon: 'fa-solid fa-circle !text-[10px] !mt-[10px]',
            markerColor: 'orange',
            shape: 'square',
          })} />
      ))}

      {mainRoute.legs.map((leg, kl) => {
        return leg.steps.map((step, ks) => {
          const geometry = decode(step.geometry, 5)
          return <Polyline key={`${kl}-${ks}`} positions={geometry} />
        })
      })}
    </>
  )
}

export default memo(MapRoutes)