import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import MySvgIcon from "@base/components/MySvgIcon";
import Slider, {SliderThumb} from "@mui/material/Slider";
import {useState} from 'react'
import {useDebounce} from 'react-use'
import {useDispatch} from "react-redux";
import {setTransparency} from "@redux-leaflet/store/layersSlice";

function SliderControl(){
    const dispatch = useDispatch()
    const [value, setValue] = useState(100);

    const [, cancel] = useDebounce(
        () => {
            dispatch(setTransparency({opacity: value/100}))
        },
        200,
        [value]
    );

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper className="absolute flex flex-col justify-between items-center" sx={{zIndex: 999, bottom: 280, right: 10, width: 32, height: 180, p: 0.5}}>
            {/*<IconButton disableRipple sx={{p: 0, mt: 1}}>
                <MySvgIcon className="fa-solid fa-ellipsis-vertical text-[16px]" color="primary"/>
            </IconButton>
            <IconButton disableRipple sx={{p: 0}}>
                <MySvgIcon className="w-auto fa-solid  fa-lightbulb-on text-[22px]" color="primary"/>
            </IconButton>*/}
            <Slider value={value} onChange={handleChange} valueLabelDisplay="auto" orientation="vertical" size="small" sx={{my: 2}} components={{
                Thumb: SliderThumb
            }}/>
           {/* <IconButton disableRipple sx={{p: 0}}>
                <MySvgIcon className="w-auto fa-solid fa-lightbulb text-[22px]" color="primary"/>
            </IconButton>*/}
        </Paper>
    )
}

export default SliderControl