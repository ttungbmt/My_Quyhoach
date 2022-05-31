import { useMapEvents } from 'react-leaflet'
import { useDispatch } from 'react-redux'
import {onMoveEnd} from './store/configSlice'

function MapEvents(){
  const dispatch = useDispatch()

  const map = useMapEvents({
    moveend({ target }){
      dispatch(onMoveEnd({center: target.getCenter(), zoom: target.getZoom()}))
    },
    click(e) {
      console.log(e)
      // console.log(e)
    },
  })

  return null
}

export default MapEvents