import {Controller, useFormContext, useWatch} from "react-hook-form";
import React, {memo} from "react";
import _ from 'lodash'
import {TextField} from "@mui/material";

function InputField({name, type = 'text', label, defaultValue = '', ...props}) {
    const {control, setValue} = useFormContext();


    return (
        <Controller
            name={name}
            defaultValue={defaultValue}
            control={control}
            render={({field}) => {
                return (
                    <TextField
                        {...field}
                        value={_.isUndefined(field.value) ? '' : field.value}
                        label={label}
                        fullWidth
                        className="mt-8 mb-10"
                        variant="outlined"
                        {...props}
                    />
                )
            }}
        />
    )
}

export default memo(InputField)