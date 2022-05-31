import {Controller, useFormContext} from "react-hook-form";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import React, {memo} from "react";
import {map, isArray, isPlainObject} from 'lodash'

const parseOpts = (options) => {
    if(isArray(options) || isPlainObject(options)){
        return map(options, (v, k) => {
            if(isPlainObject(v)) return v

            return ({label: v, value: k})
        })
    }

    return []
}

function SelectField({name, label, options = []}) {
    const {control} = useFormContext();
    const innerOptions = parseOpts(options)

    return (
        <Controller
            name={name}
            defaultValue=""
            control={control}
            render={({field}) => (
                <TextField
                    select
                    className="mt-8 mb-10"
                    {...field}
                    label={label}
                    variant="outlined"
                    fullWidth
                >
                    {map(innerOptions, (v, k) => <MenuItem key={k} value={v.value}>{v.label}</MenuItem>)}
                </TextField>
            )}
        />
    )
}

export default memo(SelectField)