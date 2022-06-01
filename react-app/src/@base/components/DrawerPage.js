import { useDispatch } from 'react-redux'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { closeSidePanel } from '@base/theme-layouts/shared-components/sidePanel/store/stateSlice'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import FusePageSimple from '@fuse/core/FusePageSimple'

function DrawerPage({className, heading, content, disablePadding = false}){
  const dispatch = useDispatch()

  return (
    <FusePageSimple
      className={className}
      sx={{
        '& .FusePageSimple-wrapper': {
          backgroundColor: theme => theme.palette.background.paper,
        },
        '& .FusePageSimple-content': {
          px: '16px',
          pb: '16px',
        }
      }}
      header={(
        <div className='flex px-16 py-10 min-h-40 mb-10'>
          <Typography className='side-heading text-18 font-semibold leading-none text-primary'>{heading}</Typography>
          <IconButton className='absolute top-4 right-6 z-999' size='small' onClick={() => dispatch(closeSidePanel())}>
            <FuseSvgIcon color='action' size={20}>heroicons-outline:x</FuseSvgIcon>
          </IconButton>
        </div>
      )}
      content={content}
    />
  )
}

export default DrawerPage