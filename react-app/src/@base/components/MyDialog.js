import Dialog from '@mui/material/Dialog'
import { useDispatch, useSelector } from 'react-redux'
import { closeDialog, selectFuseDialogOptions, selectFuseDialogState } from 'app/store/fuse/dialogSlice'
import Layout, { components } from '@base/components/Layout'
import _ from 'lodash'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

function MyDialog(props) {
  const dispatch = useDispatch()
  const state = useSelector(selectFuseDialogState)
  const { children, name, ...options } = useSelector(selectFuseDialogOptions)
  const dialogProps = _.get(components, `${name}.defaultProps.dialogProps`, {})

  const handleClose = (ev) => dispatch(closeDialog())

  const closeBtn = (
    <IconButton
      aria-label='close'
      onClick={handleClose}
      sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
    >
      <CloseIcon />
    </IconButton>
  )

  options.children = children ? children : <Layout name={name} closeBtn={closeBtn} onClose={handleClose} {...options} />

  return (
    <Dialog
      //fullScreen
      fullWidth
      open={state}
      onClose={handleClose}
      aria-labelledby='my-dialog-title'
      maxWidth={'md'}
      scroll='body'
      keepMounted={true}
      {...dialogProps}
      {...options}
    />
  )
}

export default MyDialog
