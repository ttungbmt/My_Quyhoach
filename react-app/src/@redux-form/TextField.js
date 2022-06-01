import PropTypes from 'prop-types'
import { Controller, useFormContext } from 'react-hook-form'
import { TextField as TextFieldBase } from '@mui/material'
import CloseAdornment from './CloseAdorment'
import _ from '@lodash'
import React from 'react'

function TextField(props = {}){
  const {control} = useFormContext();
  const { type, name, onClear, ...textFieldProps } = props

  const InputProps = {}

  if(type === 'search') InputProps.endAdornment = <CloseAdornment name={name} onClear={onClear}/>

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <TextFieldBase
            {...field}
            InputProps={InputProps}
            fullWidth
            error={!!error}
            helperText={_.upperFirst(error?.message)}
            onBlur={e => {
              field.onBlur(e)
              textFieldProps.onBlur && textFieldProps.onBlur(e)
            }}
            onChange={e => {
              field.onChange(e)
              textFieldProps.onChange && textFieldProps.onChange(e)
            }}
            value={field.value ?? ''}
            {...textFieldProps}
          />
        )
      }}
    />
  )
}

TextField.propTypes = {
  name: PropTypes.string.isRequired
}


export default TextField