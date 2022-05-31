const aliases = (prefix = `src`) => ({
  '@fuse': `${prefix}/@fuse`,
  '@history': `${prefix}/@history`,
  '@lodash': `${prefix}/@lodash`,
  '@mock-api': `${prefix}/@mock-api`,
  '@base': `${prefix}/@base`,
  '@redux-form': `${prefix}/@redux-form`,
  '@redux-leaflet': `${prefix}/@redux-leaflet`,
  '@redux-mapbox': `${prefix}/@redux-mapbox`,
  'app/store': `${prefix}/app/store`,
  'app/services': `${prefix}/app/services`,
  'app/shared-components': `${prefix}/app/shared-components`,
  'app/configs': `${prefix}/app/configs`,
  'app/theme-layouts': `${prefix}/app/theme-layouts`,
  'app/AppContext': `${prefix}/app/AppContext`,
});

module.exports = aliases;
