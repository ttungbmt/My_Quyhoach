import {useState, useEffect} from 'react'
import mapEmitter from '../emitter'

function passMapClicked(){
    const [passed, setPassed] = useState(true)

    useEffect(() => {
        mapEmitter.on('measure:enable', () => {
            console.log(1111)
            setPassed(false)
        })

        mapEmitter.on('measure:disable', () => {
            console.log(2222)
            setPassed(true)
        })

        return () => {
            delete mapEmitter['measure:enable']
            delete mapEmitter['measure:disable']
        }
    }, [])

    return passed
}

export default passMapClicked