import {lazy} from "react";
import {Navigate} from "react-router-dom";

const Layers = lazy(() => import('./Layers/Layers'));
const Search = lazy(() => import('@base/components/Search/Search'));
const SearchThuadat = lazy(() => import('./SearchThuadat/SearchThuadat'));
const RanhgioiHc = lazy(() => import('./RanhgioiHc/RanhgioiHc.js'));
const Info = lazy(() => import('./Info/Info'));
const InfoThuadat = lazy(() => import('./InfoThuadat/InfoThuadat'));
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
      path: 'maps',
      element: <Navigate to={'/maps/tim-kiem-thua-dat'}/>,
    },
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
    {
      path: 'maps/thong-tin-thua-dat',
      element: <InfoThuadat />,
    },
    {
      path: 'maps/thong-tin-thua-dat/:id',
      element: <InfoThuadat />,
    },
  ],
};

export default MapsAppConfig;
