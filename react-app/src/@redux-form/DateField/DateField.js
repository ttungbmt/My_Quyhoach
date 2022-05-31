import React, {memo} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {TextField} from '@mui/material';
import 'flatpickr/dist/themes/airbnb.css';
import flatpickr from 'flatpickr'
import Flatpickr from "react-flatpickr";
import {head} from 'lodash'
import moment from 'moment'
import Vietnamese from './vn'
import './style.css'

flatpickr.l10ns.vi = Vietnamese

function DateField(props) {
    const {name, label, mode = 'single', dateFormat = 'd/m/Y', locale = 'vi', ...options} = props
    const {control} = useFormContext();

    return <Controller
        name={name}
        defaultValue=""
        control={control}
        render={({field}) => {
                return <Flatpickr
                    {...field}
                    onChange={val => {
                        if(dateFormat === 'd/m/Y'){
                            if(val.length === 0){
                                field.onChange(val)
                                return
                            }

                            switch (mode){
                                case 'single':
                                    field.onChange(moment(head(val)).format('DD/MM/YYYY'));
                                    break;
                                case 'range':
                                    val.length === 2 && field.onChange(val.map(v => moment(v).format('DD/MM/YYYY')))
                                    break;
                                default:
                                    field.onChange(val.map(v => moment(v).format('DD/MM/YYYY')))
                                    break;
                            }
                        }

                    }}
                    options={{
                        locale,
                        dateFormat,
                        mode,
                        ...options
                    }}
                    render={
                        ({defaultValue, value, ...props}, ref) => <TextField
                            label={label}
                            variant="outlined"
                            className="mt-8 mb-10 mx-4"
                            fullWidth
                            InputLabelProps={{
                                shrink: true
                            }}
                            InputProps={{
                                inputRef: ref
                            }}
                            defaultValue={defaultValue} inputRef={ref}
                        />
                    }
                />
            }}
    />

}

export default memo(DateField)