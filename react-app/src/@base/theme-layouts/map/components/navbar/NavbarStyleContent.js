import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { memo, useContext } from 'react'
import Logo from 'app/theme-layouts/shared-components/Logo';
import NavbarToggleButton from 'app/theme-layouts/shared-components/NavbarToggleButton';
import UserNavbarHeader from 'app/theme-layouts/shared-components/UserNavbarHeader';
import Navigation from 'app/theme-layouts/shared-components/Navigation';
import SideHeader from '@base/theme-layouts/map/components/SideHeader'
import SidePanelToggleButton from '@base/theme-layouts/shared-components/sidePanel/SidePanelToggleButton'
import NotificationPanelToggleButton from 'app/theme-layouts/shared-components/notificationPanel/NotificationPanelToggleButton';
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button'
import { useRoutes } from 'react-router-dom'
import FuseSuspense from '@fuse/core/FuseSuspense'
import AppContext from 'app/AppContext'


const Root = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  '& ::-webkit-scrollbar-thumb': {
    boxShadow: `inset 0 0 0 20px ${
      theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.24)' : 'rgba(255, 255, 255, 0.24)'
    }`,
  },
  '& ::-webkit-scrollbar-thumb:active': {
    boxShadow: `inset 0 0 0 20px ${
      theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.37)' : 'rgba(255, 255, 255, 0.37)'
    }`,
  },
}));

const StyledContent = styled(FuseScrollbars)(({ theme }) => ({
  overscrollBehavior: 'contain',
  overflowX: 'hidden',
  overflowY: 'auto',
  WebkitOverflowScrolling: 'touch',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 40px, 100% 10px',
  backgroundAttachment: 'local, scroll',
}));

function NavbarStyleContent(props) {
  const {routes} = useContext(AppContext);

  return (
    <Root className={clsx('h-full', props.className)}>
      <FuseSuspense>{useRoutes(routes)}</FuseSuspense>
    </Root>
  );
}

export default memo(NavbarStyleContent);
