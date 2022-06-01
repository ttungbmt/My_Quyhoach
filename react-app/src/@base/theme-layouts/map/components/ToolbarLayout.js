import { styled, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Hidden from '@mui/material/Hidden';
import Toolbar from '@mui/material/Toolbar';
import clsx from 'clsx';
import { memo, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { selectFuseCurrentLayoutConfig, selectToolbarTheme } from 'app/store/fuse/settingsSlice';
import { selectFuseNavbar } from 'app/store/fuse/navbarSlice';
import NavbarToggleButton from 'app/theme-layouts/shared-components/NavbarToggleButton';
import SidePanelToggleButton from '@base/theme-layouts/shared-components/sidePanel/SidePanelToggleButton'
import UserMenu from '@base/theme-layouts/shared-components/UserMenu'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import FullScreenToggle from '@base/theme-layouts/shared-components/FullScreenToggle'

const Root = styled('div')(({ theme, config }) => ({
  position: 'absolute',
  padding: '10px',
  zIndex: 999,
  right: 0,

  [theme.breakpoints.down('md')]: {
    width: '100%',
  },

  '& #fuse-toolbar': {
    backgroundColor: '#ffffffd6'
  }
}));


function ToolbarLayout(props) {
  const config = useSelector(selectFuseCurrentLayoutConfig);
  const toolbarTheme = useSelector(selectToolbarTheme);

  const rightItems = useMemo(() => [
    {name: 'fullscreen', layout: ({ name }) => <FullScreenToggle name={name}/>},
    {name: 'legend', layout: ({ name }) => <SidePanelToggleButton name={name}/>},
    {name: 'basemap', layout: ({ name }) => <SidePanelToggleButton name={name}/>},
    {name: 'account', layout: ({ name }) => <UserMenu name={name}/>},
  ], [])


  return (
    <ThemeProvider theme={toolbarTheme}>
      <Root>
        <AppBar
          id="fuse-toolbar"
          className={clsx('flex relative z-20 shadow-md rounded-full', props.className)}
          color="default"
          position="static"
        >
          <Toolbar className="p-0 min-h-48 md:min-h-48">
            <div className="flex flex-1">
              {config.navbar.display && config.navbar.position === 'left' && (
                <>
                  <Hidden lgUp>
                    <NavbarToggleButton className="w-40 h-40 p-0 mx-8 sm:mx-8" >
                      <FuseSvgIcon size={20} color="action">
                        material-twotone:menu_open
                      </FuseSvgIcon>
                    </NavbarToggleButton>
                  </Hidden>
                </>
              )}
            </div>

            <div className="flex items-center px-8 h-full overflow-x-auto">
              {rightItems.map(({ name, layout: Layout }, k) => (
                <Layout key={name} name={name}/>
              ))}
            </div>
          </Toolbar>
        </AppBar>
      </Root>

    </ThemeProvider>
  );
}

export default memo(ToolbarLayout);
