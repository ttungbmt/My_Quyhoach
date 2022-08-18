import {createControlComponent} from '@react-leaflet/core'
import {useMap} from 'react-leaflet'
import {Control} from 'leaflet'
import {useEffect} from 'react'
import $ from 'jquery'
import './leaflet.measure'
import { mapEmitter } from '@redux-leaflet'

L.Measure = {
    linearMeasurement: "Đo khoảng cách",
    areaMeasurement: "Đo diện tích",
    start: "Điểm bắt đầu",
    meter: "m",
    kilometer: "km",
    squareMeter: "m²",
    squareKilometers: "km²",
}

export const MeasureControl = createControlComponent(function createZoomControl(props) {
    const map = useMap()

    useEffect(() => {
        // setTimeout(() => {
        //   let measureHandler = new L.MeasureAction(map, {
        //     model: "distance",
        //   })
        //
        //   console.log(measureHandler.enable())
        // }, 2000)

        map.on('measure:enable', () => {
            mapEmitter.emit('measure:enable')
        })

        map.on('measure:disable', () => {
            mapEmitter.emit('measure:disable')
        })

        setTimeout(() => {
            $('.leaflet-measure-contents a').click(function (e) {
                e.preventDefault()
            })
        }, 200)
    }, [])

    return new Control.Measure({
        title: 'Công cụ đo đạc',
        linearMeasurement: "Đo khoảng cách",
        areaMeasurement: "Đo diện tích",
        ...props
    })
})

