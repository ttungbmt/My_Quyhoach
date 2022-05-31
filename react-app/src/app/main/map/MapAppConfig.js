import {lazy} from "react";

const Layers = lazy(() => import('./Layers/Layers'));
const Search = lazy(() => import('@base/components/Search/Search'));
const SearchThuadat = lazy(() => import('./SearchThuadat/SearchThuadat'));
const RanhgioiHc = lazy(() => import('./RanhgioiHc/RanhgioiHc.js'));
const Info = lazy(() => import('./Info/Info'));
// const Direction = lazy(() => import('@base/components/Direction/Direction'));
const Direction = require('@base/components/Direction/Direction').default;

const MapsAppConfig = {
  settings: {
    layout: {
      // style: 'map',
    },
  },
  routes: [
    {
      path: 'maps/layers',
      element: <Layers />,
    },
    {
      path: 'maps/search',
      element: <Search />,
    },
    {
      path: 'maps/info',
      element: <Info />,
    },
    {
      path: 'maps/tim-kiem-thua-dat',
      element: <SearchThuadat />,
    },
    {
      path: 'maps/ranh-gioi-hc',
      element: <RanhgioiHc />,
    },
    {
      path: 'maps/dir',
      element: <Direction />,
    },
  ],
};

export default MapsAppConfig;
