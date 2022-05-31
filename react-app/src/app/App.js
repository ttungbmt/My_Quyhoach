import '@mock-api';
import BrowserRouter from '@fuse/core/BrowserRouter';
import FuseLayout from '@fuse/core/FuseLayout';
import FuseTheme from '@fuse/core/FuseTheme';
import { SnackbarProvider } from 'notistack';
import { useDispatch, useSelector } from 'react-redux'
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { selectCurrentLanguageDirection } from 'app/store/i18nSlice';
import { selectUser } from 'app/store/userSlice';
import themeLayouts from 'app/theme-layouts/themeLayouts';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import FuseAuthorization from '@fuse/core/FuseAuthorization';
import settingsConfig from 'app/configs/settingsConfig';
import withAppProviders from './withAppProviders';
import { AuthProvider } from './auth/AuthContext';
import { useEffect } from 'react'
import { addDataSidePanel } from '@base/theme-layouts/shared-components/sidePanel/store/dataSlice'
import { addLayers, setBasemapId } from '@redux-leaflet/store/layersSlice'
import { QueryClient, QueryClientProvider } from 'react-query'

// import axios from 'axios';
/**
 * Axios HTTP Request defaults
 */
// axios.defaults.baseURL = "";
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

const emotionCacheOptions = {
  rtl: {
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
    insertionPoint: document.getElementById('emotion-insertion-point'),
  },
  ltr: {
    key: 'muiltr',
    stylisPlugins: [],
    insertionPoint: document.getElementById('emotion-insertion-point'),
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser);
  const langDirection = useSelector(selectCurrentLanguageDirection);
  const mainTheme = useSelector(selectMainTheme);

  useEffect(() => {
    dispatch(addDataSidePanel({
      menu: [
        {name: 'intro', title: 'Giới thiệu phần mềm', iconClass: 'fa-solid fa-browser'},
        {name: 'doc', title: 'Hướng dẫn sử dụng', iconClass: 'fa-solid fa-book-sparkles'},
        {name: 'faq', title: 'Các câu hỏi thường gặp', iconClass: 'fa-solid fa-cloud-question'},
        {name: 'feedback', title: 'Đánh giá & Góp ý', iconClass: 'fa-solid fa-message-lines'},
      ]
    }))

    // dispatch(setBasemapId('osm'))

    dispatch(addLayers([
      {baselayer: true, name: 'becamaps', title: 'BecaMaps', url: 'http://becamaps.vntts.vn:82/geoserver/gwc/service/wmts?layer=osm:osm_vietnam&style=&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}'},
      {baselayer: true, name: 'mapbox', title: 'Mapbox Street', url: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWljaGFlbGRvcm1hbiIsImEiOiJjaXZwY2U0Z2IwMDF0MnRwOHF5MHYzeHM0In0.UdcEo0k-jS29ebI_fhIpMw'},
      {baselayer: true, name: 'osm', title: 'OSM', url: 'http://tile.openstreetmap.org/{z}/{x}/{y}.png'},
      {baselayer: true, name: 'vietbando', title: 'Vietbando', url: 'http://images.vietbando.com/ImageLoader/GetImage.ashx?Ver=2016&LayerIds=VBD&Y={y}&X={x}&Level={z}'},
      {baselayer: true, name: 'google-maps', title: 'Google Maps', url: 'http://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'},
      {baselayer: true, name: 'google-satellite', title: 'Google Satellite', url: 'http://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'},
      {baselayer: true, name: 'google-satellite-hybrid', title: 'Google Satellite Hybrid', url: 'http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'},
    ]))

  }, [dispatch])

  return (
    <CacheProvider value={createCache(emotionCacheOptions[langDirection])}>
      <FuseTheme theme={mainTheme} direction={langDirection}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <BrowserRouter>
              <FuseAuthorization
                userRole={user.role}
                loginRedirectUrl={settingsConfig.loginRedirectUrl}
              >
                <SnackbarProvider
                  maxSnack={5}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  classes={{
                    containerRoot: 'bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99',
                  }}
                >
                  <FuseLayout layouts={themeLayouts} />
                </SnackbarProvider>
              </FuseAuthorization>
            </BrowserRouter>
          </AuthProvider>
        </QueryClientProvider>
      </FuseTheme>
    </CacheProvider>
  );
};

export default withAppProviders(App)();
