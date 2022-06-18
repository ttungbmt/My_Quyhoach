import { styled, useTheme } from '@mui/material/styles'
import FuseMessage from '@fuse/core/FuseMessage';
import AppContext from 'app/AppContext';
import { memo, useContext } from 'react';
import { useSelector } from 'react-redux'
import { selectFuseCurrentLayoutConfig } from 'app/store/fuse/settingsSlice';
import useMediaQuery from '@mui/material/useMediaQuery'
import clsx from 'clsx'
import FooterLayout from './components/FooterLayout';
import LeftSideLayout from './components/LeftSideLayout';
import SidebarWrapperLayout from './components/SidebarWrapperLayout';
import RightSideLayout from './components/RightSideLayout';
import ToolbarLayout from './components/ToolbarLayout';
import SettingsPanel from 'app/theme-layouts/shared-components/SettingsPanel';
import SidePanel from "@base/theme-layouts/shared-components/sidePanel/SidePanel";
import {registerLayout} from "@base/components/Layout";

import DocLayout from './components/dialogs/DocLayout'
import IntroLayout from './components/dialogs/IntroLayout'
import FAQLayout from './components/dialogs/FAQLayout'
import FeedbackLayout from './components/dialogs/FeedbackLayout'
import ShareLayout from './components/dialogs/ShareLayout'
import DeleteConfirmationLayout from './components/dialogs/DeleteConfirmationLayout'

import MenuLayout from './components/drawer-panel/MenuLayout'
import BasemapLayout from './components/drawer-panel/BasemapLayout'
import LegendLayout from './components/drawer-panel/LegendLayout'

import MyDialog from "@base/components/MyDialog";
import SideMenu from './components/side-menu/SideMenu'
import MapLayout from './components/map/MapLayout'
import {MapboxLayout} from '@redux-mapbox'
import SaveThuadatLayout from "../../../app/main/map/InfoThuadat/SaveThuadatLayout";
import SearchBar from "./components/SearchBar";
import NavbarToggleFab from "@base/theme-layouts/shared-components/NavbarToggleFab";
import Hidden from "@mui/material/Hidden";

const Root = styled('div')(({ theme, config }) => ({
  ...(config.mode === 'boxed' && {
    clipPath: 'inset(0)',
    maxWidth: `${config.containerWidth}px`,
    margin: '0 auto',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  }),
  ...(config.mode === 'container' && {
    '& .container': {
      maxWidth: `${config.containerWidth}px`,
      width: '100%',
      margin: '0 auto',
    },
  }),
}));

registerLayout('intro', IntroLayout)
registerLayout('doc', DocLayout)
registerLayout('faq', FAQLayout)
registerLayout('feedback', FeedbackLayout)
registerLayout('share', ShareLayout)
registerLayout('delete-confirmation', DeleteConfirmationLayout)
registerLayout('save-thuadat', SaveThuadatLayout)

registerLayout('menu', MenuLayout)
registerLayout('legend', LegendLayout)
registerLayout('basemap', BasemapLayout)

function Layout(props) {
  const config = useSelector(selectFuseCurrentLayoutConfig);
  const appContext = useContext(AppContext);
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Root id="fuse-layout" config={config} className="w-full flex">
      {config.leftSidePanel.display && <LeftSideLayout />}

      <div className="flex flex-auto min-w-0 md:flex-row flex-col">
        <SideMenu />

        <SidePanel />

        {config.navbar.display && config.navbar.position === 'left' && <SidebarWrapperLayout />}

        <main id="fuse-main" className={clsx("flex flex-col flex-auto min-h-full min-w-0 relative z-10", {'pb-[50px]': mdDown})}>
          <SearchBar />
          {config.toolbar.display && (
            <ToolbarLayout className={config.toolbar.style === 'fixed' && 'sticky top-0'} />
          )}

          <Hidden lgDown>
            <div className="sticky top-0 z-99">
              <SettingsPanel />
            </div>
          </Hidden>

          <div className="flex flex-col flex-auto min-h-0 relative z-10">
            <MyDialog/>

            <MapLayout />
            {/*<MapboxLayout />*/}
          </div>

          {config.footer.display && (
            <FooterLayout className={config.footer.style === 'fixed' && 'sticky bottom-0'} />
          )}
        </main>

        {config.navbar.display && config.navbar.position === 'right' && <NavbarWrapperLayout />}
      </div>

      {config.rightSidePanel.display && <RightSideLayout />}
      <FuseMessage />
    </Root>
  );
}

export default memo(Layout);
