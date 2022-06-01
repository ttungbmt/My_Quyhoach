import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import { toggleSidePanel } from '@base/theme-layouts/shared-components/sidePanel/store/stateSlice'
import { env } from '@base/utils'

// i18next.addResourceBundle('en', 'navigation', en);
// i18next.addResourceBundle('tr', 'navigation', tr);
// i18next.addResourceBundle('ar', 'navigation', ar);

const items = [
  {
    id: 'menu',
    title: 'Menu',
    type: 'item',
    icon: 'menu',
    action: {
      type: toggleSidePanel.type,
      payload: 'menu'
    }
  },
  {
    id: 'layers',
    title: 'Lớp dữ liệu',
    type: 'item',
    icon: 'layers',
    url: '/maps/layers',
  },
  {
    id: 'search',
    type: 'item',
    title: 'Tìm kiếm vị trí',
    icon: 'search',
    url: '/maps/search',
  },
  {
    id: 'search-thuadat',
    type: 'item',
    title: 'Tìm kiếm thửa đất',
    iconClass: 'fa-regular fa-magnifying-glass-location',
    url: '/maps/tim-kiem-thua-dat',
  },
  {
    id: 'info',
    type: 'item',
    title: 'Thông tin chi tiết',
    iconClass: 'fa-light fa-square-info',
    url: '/maps/info',
  },
  {
    id: 'dir',
    type: 'item',
    title: 'Kế hoạch lộ trình',
    iconClass: 'fa-light fa-route',
    url: '/maps/dir',
  },
  {
    id: 'ranhgioi-hc',
    type: 'item',
    title: 'Ranh giới hành chính',
    iconClass: 'fa-light fa-sitemap overflow-visible',
    url: '/maps/ranh-gioi-hc',
  },
]

const navigationConfig = env('MENUS', _.map(items, 'id').join(',')).split(',').map(id => {
  return _.find(items, {id});
});

export default navigationConfig;
