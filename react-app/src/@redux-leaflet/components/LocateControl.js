import { createControlComponent } from '@react-leaflet/core'
import { Control } from 'leaflet'

export const LocateControl = createControlComponent(function createZoomControl(props) {
    return new Control.Locate(props)
})