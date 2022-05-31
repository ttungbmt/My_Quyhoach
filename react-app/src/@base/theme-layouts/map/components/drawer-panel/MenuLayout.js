import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/material/styles';
import { ListItem, ListItemIcon, ListItemText, List } from '@mui/material'
import clsx from 'clsx'
import { toggleSidePanel } from '@base/theme-layouts/shared-components/sidePanel/store/stateSlice'
import { openDialog } from 'app/store/fuse/dialogSlice'

const Root = styled('div')(({theme}) => ({
  paddingTop: 20,
  '& .site-icon': {
    paddingLeft: 20,
    // margin: 'auto',
    maxWidth: 290,
  }
}));

function MenuLayout({ data = [] }){
  const dispatch = useDispatch()

  return (
    <Root>
      <img className="site-icon" src="https://tongdaidiaoc.com.vn/_nuxt/img/logo_tddo_light.9fc8f79.png" alt="None"/>
      <List sx={{mt: 2}}>
        {data.map(({name, title, iconClass}, k) => (
          <ListItem button key={k} onClick={() => {
            dispatch(toggleSidePanel('menu'))
            dispatch(openDialog({ name }))
          }}>
            <ListItemIcon sx={{minWidth: 40}}>
              <i className={clsx('text-[18px]', iconClass)}/>
            </ListItemIcon>
            <ListItemText primary={title}/>
          </ListItem>
        ))}
      </List>
    </Root>
  )
}

MenuLayout.defaultProps = {
  drawerProps: {
    mode: 'dark',
    classes: { paper: '!bg-[#3A3D48]' },
    anchor: 'left',
    width: 320
  }
}


export default MenuLayout