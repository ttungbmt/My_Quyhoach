import {FormControlLabel, Rating} from "@mui/material";
import clsx from "clsx";

function RatingField({className, name, label, labelPlacement = 'top'}){
    return (
        <FormControlLabel
            className={className}
            labelPlacement={labelPlacement}
            control={<Rating name={name} className={clsx("mt-8 mb-10", {'ml-6': labelPlacement === 'start'})}/>}
            label={label}
        />
    )
}

export default RatingField