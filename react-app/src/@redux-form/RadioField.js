import {FormControl, FormControlLabel, FormLabel, RadioGroup} from "@mui/material";
import {Radio} from "@material-ui/icons";

function RadioField({name, label, items}){
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup aria-label="gender" name={name}>
                {items.map((v, k) => (<FormControlLabel key={k} value={k} control={<Radio />} label={v} />))}
            </RadioGroup>
        </FormControl>
    )
}

export default RadioField