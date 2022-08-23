import {useState, useEffect} from 'react'
import mapEmitter from '../emitter'

function passMapClicked(){
    const [passed, setPassed] = useState(true)

    useEffect(() => {
        mapEmitter.on('measure:enable', () => {
            setPassed(false)
        })

        mapEmitter.on('measure:disable', () => {
            setPassed(true)
        })

        mapEmitter.on('pm:globaldrawmodetoggled', ({enabled}) => {
            setPassed(!enabled)
        })

        mapEmitter.on('pm:globaleditmodetoggled', ({enabled}) => {
            setPassed(!enabled)
        })


        return () => {
            delete mapEmitter['measure:enable']
            delete mapEmitter['measure:disable']
            delete mapEmitter['pm:globaldrawmodetoggled']
            delete mapEmitter['pm:globaleditmodetoggled']
        }
    }, [])

    return passed
}

export default passMapClicked