import {useMap} from 'react-leaflet'
import { useLeafletContext } from '@react-leaflet/core'
import {useEffect, useState} from "react";
import { mapEmitter } from '@redux-leaflet'
import useDrawStore from "./useDrawStore";
import ReactDOM from 'react-dom'
import $ from 'jquery'
import { Link } from "react-router-dom";

import vi from './vi.json'

function logEvent(e) {
    console.log(e);
}

function GeomanLayer({element}) {
    const context = useLeafletContext()

    useEffect(() => {
        const container = context.layerContainer || context.map

        if(!container.hasLayer(element)) container.addLayer(element)

        return () => {
            if(container.hasLayer(element)) container.removeLayer(element)
        }
    }, [])

    return null
}

function PopupContent({ children }) {
    const popupId = useDrawStore('popupId')

    if(!popupId) return null

    return ReactDOM.createPortal(
        <div id="popup-content">
            <Link to={`/maps/my-data/create?elementId=${popupId}`}>Mở form lưu dữ liệu</Link>
        </div>,
        document.querySelector(`#popup-${popupId}`),
    )
}

function DrawControl(props){
    const [layers, addLayer, removeLayer, setPopupId] = useDrawStore('layers, addLayer, removeLayer, setPopupId')
    const {globalOptions, ...toolbarOptions} = props

    const map = useMap()

    useEffect(() => {
        map.pm.setLang('vi', vi , 'en')

        map.pm.setGlobalOptions(globalOptions)

        map.pm.addControls(toolbarOptions)

        const onDrawStart = (e) => {
            mapEmitter.emit('pm:drawstart')
            // console.log('drawstart', e)
        }

        const onCreate = (e) => {
            mapEmitter.emit('pm:create', e)

            let layer = e.layer,
                shape = e.shape;

            //Edit Event
            layer.on('pm:edit', (e) => {
                e.layer.closePopup()
            });
            layer.on('pm:update', logEvent);
            layer.on('pm:enable', logEvent);
            layer.on('pm:disable', logEvent);
            layer.on('pm:vertexadded', logEvent);
            layer.on('pm:vertexremoved', logEvent);
            layer.on('pm:markerdragstart', logEvent);
            layer.on('pm:markerdrag', logEvent);
            layer.on('pm:markerdragend', logEvent);
            layer.on('pm:snap', logEvent);
            layer.on('pm:snapdrag', logEvent);
            layer.on('pm:unsnap', logEvent);
            layer.on('pm:intersect', logEvent);
            layer.on('pm:centerplaced', logEvent);

            shape !== 'Marker' && layer.showMeasurements()

            let popupId = `${layer._leaflet_id}`

            layer.bindPopup(`<div id="popup-${popupId}"</div>`, {minWidth: 150})
            layer.on('popupopen', (e) => {
                $('.leaflet-popup-close-button').click(e => e.preventDefault())
                setPopupId(popupId)
                setTimeout(() => setPopupId(popupId), 200)
            })
            layer.on('popupclose', (e) => {
                setTimeout(() => setPopupId(null), 200)
            })

            // map.removeLayer(layer)
            addLayer(layer)
        }

        const onDrawend = (e) => {
            mapEmitter.emit('pm:drawend')
        }

        const onRemove = (e) => {
            mapEmitter.emit('pm:remove')
            removeLayer(e.layer._leaflet_id)
        }

        const onGlobalDrawModeToggled = (e) => {
            mapEmitter.emit('pm:globaldrawmodetoggled', e)
        }

        const onGlobalEditModeToggled = (e) => {
            mapEmitter.emit('pm:globaleditmodetoggled', e)
        }

        map.on('pm:drawstart', onDrawStart)
        map.on('pm:create', onCreate)
        map.on('pm:drawend', onDrawend)
        map.on('pm:remove', onRemove)

        //Toggle mode events
        map.on('pm:globaleditmodetoggled', onGlobalEditModeToggled);
        map.on('pm:globaldragmodetoggled', logEvent);
        map.on('pm:globalremovalmodetoggled', logEvent);
        map.on('pm:globaldrawmodetoggled', onGlobalDrawModeToggled);
        map.on('pm:globalcutmodetoggled', logEvent);

        return () => {
            map.pm.removeControls()

            map.off('pm:drawstart', onDrawStart)
            map.off('pm:create', onCreate)
            map.off('pm:drawend', onDrawend)
            map.off('pm:remove', onRemove)

            map.off('pm:globaleditmodetoggled', onGlobalEditModeToggled);
            map.off('pm:globaldragmodetoggled', logEvent);
            map.off('pm:globalremovalmodetoggled', logEvent);
            map.off('pm:globaldrawmodetoggled', logEvent);
            map.off('pm:globalcutmodetoggled', logEvent);

        }
    }, [])

    return (
        <>
            {/*{layers.map((element) => <GeomanLayer key={element._leaflet_id} element={element}/>)}*/}
            <PopupContent />
        </>
    )
}

DrawControl.defaultProps = {
    position: 'bottomright',
    drawCircleMarker: false,
    globalOptions: {
        snapMiddle: true,
        continueDrawing: false,
        finishOn: 'dbclick'
    }
}

export default DrawControl