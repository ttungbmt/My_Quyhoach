import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/material/styles';
import { ListItem, ListItemIcon, ListItemText, List } from '@mui/material'
import clsx from 'clsx'
import { toggleSidePanel } from '@base/theme-layouts/shared-components/sidePanel/store/stateSlice'
import { openDialog } from 'app/store/fuse/dialogSlice'
import { env } from '@base/utils'
import Box from "@mui/material/Box";

const Root = styled('div')(({theme}) => ({
  '& .site-icon': {
    width: 50,
    height: '100%'
    // maxWidth: 290,
    // maxHeight: 100,
  }
}));

function MenuLayout({ data = [] }){
  const dispatch = useDispatch()

  return (
    <Root>
      <a href={env('HOMEPAGE')} className="!no-underline">
        <div className="px-[16px] py-[16px] flex items-center gap-12 border-b">
          <img className="site-icon" src={env('LOGO')} alt="None"/>
          <div>
            <div className="text-[20px] uppercase font-bold">
              <span className="text-gray-700">TỔNG ĐÀI</span>
              <Box component="span" className="pl-4" sx={{color: 'primary.main'}}>ĐỊA ỐC</Box>
            </div>
            {env('TAGLINE') && <Box component="span" className="text-[12px] font-medium" sx={{color: 'secondary.main'}}>{env('TAGLINE')}</Box>}
          </div>
        </div>
      </a>
      <List sx={{mt: 1}}>
        {data.map(({name, title, iconClass}, k) => (
          <ListItem
            sx={{
              '&.MuiListItem-root:hover': {
                color: 'primary.main'
              }}}
            button
            key={k}
            className="pl-[25px]"
            onClick={() => {
              dispatch(toggleSidePanel('menu'))
              dispatch(openDialog({ name }))
            }}>
            <ListItemIcon sx={{minWidth: 40}}>
              <i className={clsx('text-[20px]', iconClass)}/>
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
    anchor: 'left',
    width: 280
  }
}


export default MenuLayout