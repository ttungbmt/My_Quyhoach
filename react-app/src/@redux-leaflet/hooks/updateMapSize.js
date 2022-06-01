import { useRef } from 'react'
import useResizeObserver from 'beautiful-react-hooks/useResizeObserver'
import { useUpdateEffect } from 'react-use'
import { getMap } from '../store'

function updateMapSize(){
  const mapRef = useRef();
  const DOMRect = useResizeObserver(mapRef);

  useUpdateEffect(() => {
    getMap()?.invalidateSize()
  }, [DOMRect])

  return [mapRef, DOMRect]
}


export default updateMapSize