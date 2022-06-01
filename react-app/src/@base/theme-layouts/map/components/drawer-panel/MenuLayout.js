import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/material/styles';
import { ListItem, ListItemIcon, ListItemText, List } from '@mui/material'
import clsx from 'clsx'
import { toggleSidePanel } from '@base/theme-layouts/shared-components/sidePanel/store/stateSlice'
import { openDialog } from 'app/store/fuse/dialogSlice'
import { env } from '@base/utils'

const Root = styled('div')(({theme}) => ({
  paddingTop: 20,
  '& .site-icon': {
    paddingLeft: 20,
    // margin: 'auto',
    maxWidth: 290,
    maxHeight: 100,
  }
}));

function MenuLayout({ data = [] }){
  const dispatch = useDispatch()

  return (
    <Root>
      <div className="flex flex-col items-center pl-12 pr-24">
        <img className="site-icon" src={env('LOGO_LIGHT')} alt="None"/>
        <div className="text-[20px] uppercase mt-16 font-semibold">{env('NAME')}</div>
      </div>
      <List sx={{mt: 2}}>
        {data.map(({name, title, iconClass}, k) => (
          <ListItem
            button
            key={k}
            className="pl-[30px]"
            onClick={() => {
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
    width: 280
  }
}


export default MenuLayout