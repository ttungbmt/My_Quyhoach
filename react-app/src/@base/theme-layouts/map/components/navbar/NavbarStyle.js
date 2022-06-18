import Hidden from '@mui/material/Hidden';
import { styled } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { navbarCloseMobile, selectFuseNavbar } from 'app/store/fuse/navbarSlice';
import { selectFuseCurrentLayoutConfig } from 'app/store/fuse/settingsSlice';
import NavbarStyleContent from './NavbarStyleContent';
import {useWindowSize} from "react-use";

const navbarWidth = 400;

const StyledNavBar = styled('div')(({ theme, open, position }) => ({
  minWidth: navbarWidth,
  width: navbarWidth,
  maxWidth: navbarWidth,
  ...(!open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(position === 'left' && {
      marginLeft: `-${navbarWidth}px`,
    }),
    ...(position === 'right' && {
      marginRight: `-${navbarWidth}px`,
    }),
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const navBarMobileHeight = 'calc(100% - 51px)'

const StyledNavBarMobile = styled(SwipeableDrawer, {
  shouldForwardProp: (prop) => !_.includes(['drawerWidth'], prop)
})(({ theme, drawerWidth }) => ({
  '& .MuiDrawer-paper': {
    // minWidth: navbarWidth,
    width: drawerWidth,
    // maxWidth: navbarWidth,
    height: navBarMobileHeight,
  },
}));

function NavbarStyle(props) {
  const dispatch = useDispatch();
  const config = useSelector(selectFuseCurrentLayoutConfig);
  const navbar = useSelector(selectFuseNavbar);
  const {width: windowWidth} = useWindowSize();
  const drawerWidth = windowWidth <= navbarWidth ? '100%' : navbarWidth

  return (
    <>
      <Hidden lgDown>
        <StyledNavBar
          className="flex-col flex-auto sticky top-0 overflow-hidden h-screen shrink-0 z-20 shadow-3"
          open={navbar.open}
          position={config.navbar.position}
        >
          <NavbarStyleContent />
        </StyledNavBar>
      </Hidden>

      <Hidden lgUp>
        <StyledNavBarMobile
          classes={{
            paper: 'flex-col flex-auto h-full',
          }}
          anchor={config.navbar.position}
          variant="temporary"
          open={navbar.mobileOpen}
          onClose={() => dispatch(navbarCloseMobile())}
          onOpen={() => {}}
          disableSwipeToOpen
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          drawerWidth={drawerWidth}
        >
          <NavbarStyleContent />
        </StyledNavBarMobile>
      </Hidden>
    </>
  );
}

export default NavbarStyle;
