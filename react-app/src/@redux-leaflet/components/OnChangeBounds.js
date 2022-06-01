import { useMap } from 'react-leaflet'
import { useEffect } from 'react'
import _ from 'lodash'

function OnChangeBounds({bounds}){
  const map = useMap()

  useEffect(() => {
    !_.isEmpty(bounds) && map.fitBounds(bounds)
  }, [JSON.stringify(bounds)])

  return null
}

export default OnChangeBounds