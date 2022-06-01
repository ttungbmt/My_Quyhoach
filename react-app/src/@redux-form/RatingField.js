import { FormControlLabel, Rating, TextField } from '@mui/material'
import clsx from "clsx";
import { Controller, useFormContext } from 'react-hook-form'
import _ from 'lodash'
import React from 'react'

function RatingField({className, name, label, labelPlacement = 'top'}){
    const {control} = useFormContext();

    return (
      <Controller
        name={name}
        control={control}
        render={({field}) => {
            return (
              <FormControlLabel
                className={clsx('justify-end', className)}
                labelPlacement={labelPlacement}
                control={<Rating name={name} className={clsx("mt-8 mb-10", {'ml-6': labelPlacement === 'start'})} {...field}/>}
                label={label}
              />
            )
        }}
      />
    )
}

export default RatingField