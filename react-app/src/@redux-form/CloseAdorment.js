import { useFormContext } from 'react-hook-form'
import { InputAdornment } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import { isNil } from 'lodash'

function CloseAdornment({name, onClear}){
  const { watch, resetField } = useFormContext()
  const value = watch(name)

  if(isNil(value) || value.length === 0) return null

  return (
    <InputAdornment position="end">
      <IconButton size="small" onClick={e => {
        onClear ? onClear() : resetField(name)
      }}><FuseSvgIcon color="action" size={16}>heroicons-solid:x</FuseSvgIcon></IconButton>
    </InputAdornment>
  )
}

export default CloseAdornment