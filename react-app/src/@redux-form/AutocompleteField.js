import {Controller, useFormContext} from "react-hook-form";
import {Autocomplete, TextField} from "@mui/material";
import React, {memo, useEffect, useState} from "react";
import {zipObject, isEmpty, template, get, isPlainObject} from 'lodash'
import axios from 'axios'

function AutocompleteField({name, label, options = [], depends = [], url = ''}) {
    const {control, watch, setValue, getValues} = useFormContext();
    const [items, setItems] = useState(options)
    const watchFields = watch(depends).filter(v => v)

    useEffect(() => {
        if(isEmpty(depends)){
           if(url.length > 0) axios.get(url).then(({data}) => setItems(data))
        } else {
            if(!isEmpty(watchFields)) {
                let values = zipObject(depends, watchFields)
                let parsedUrl = template(url, {interpolate: /{([\s\S]+?)}/g})(values)
                axios.get(parsedUrl).then(({data}) => {
                    setItems(data)
                    setValue(name, getValues(name))
                })
            } else {
                setItems([])
                // setValue(name, '')
            }
        }


    }, [JSON.stringify(watchFields)])


    return (
        <Controller
            name={name}
            control={control}
            render={({field}) => {
                if(url && items.length === 0) return <TextField label={label} fullWidth className="mt-8 mb-10" variant="outlined" placeholder="Loading..."/>

                return (
                    <Autocomplete
                        {...field}
                        options={items}
                        getOptionLabel={(option) => {
                            if(!isPlainObject(option)) return get(items.filter(v => v.value == option), '0.label', '')
                            return option.label
                        }}
                        onChange={(_, data) => {
                            data && field.onChange(data.value)
                        }}
                        onInputChange={(event, value, reason) => {
                            if(value === '') field.onChange('')
                        }}
                        renderInput={(params) => {
                            return <TextField {...params} className="mt-8 mb-10" variant="outlined" label={label}/>
                        }}
                    />
                )
            }}
        />
    )
}

export default memo(AutocompleteField)