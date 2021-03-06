import Paper from "@mui/material/Paper";
import {useDispatch, useSelector} from "react-redux";
import {useToggle} from "react-use";
import {selectBasemapId, setBasemapId} from "@redux-leaflet/store/layersSlice";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function BasemapControl(){
    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down('lg'));
    const dispatch = useDispatch()
    const basemapId = useSelector(selectBasemapId)
    const [on, toggle] = useToggle(false);

    const size = mdDown ? 50 : 75

    const onToggle = (on) => {
        if(on) dispatch(setBasemapId('google-satellite'))
        else dispatch(setBasemapId('mapbox'))

        toggle()
    }

    return (
        <Paper className="absolute cursor-pointer" sx={{zIndex: 999, fontSize: 13, bottom: 10, left: 10, width: size, height: size, p: 0.3}} onClick={() => onToggle(!on)}>
            {!on && <img src="https://mt1.google.com/vt/lyrs=s&x=409&y=239&z=9" alt="" style={{borderRadius: 16}}/>}
            {on && <img src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/13/6562/3831@2x?access_token=pk.eyJ1IjoibWljaGFlbGRvcm1hbiIsImEiOiJjaXZwY2U0Z2IwMDF0MnRwOHF5MHYzeHM0In0.UdcEo0k-jS29ebI_fhIpMw" alt="" style={{borderRadius: 16}}/>}
        </Paper>
    )
}

export default BasemapControl