import PropTypes from 'prop-types'
import { Controller, useFormContext } from 'react-hook-form'
import { TextField as TextFieldBase } from '@mui/material'
import CloseAdornment from './CloseAdorment'

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
            InputProps={InputProps}
            {...textFieldProps}
            {...field}
            onBlur={e => {
              field.onBlur(e)
              textFieldProps.onBlur && textFieldProps.onBlur(e)
            }}
            onChange={e => {
              field.onChange(e)
              textFieldProps.onChange && textFieldProps.onChange(e)
            }}
            error={!!error}
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