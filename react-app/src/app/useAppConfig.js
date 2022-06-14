import { useAsync } from 'react-use'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading as setMapLoading, setBounds } from '@redux-leaflet/store/configSlice'
import { selectBasemapId, addBaseLayers, setBasemapId, addLayers } from '@redux-leaflet/store/layersSlice'
import { addDataSidePanel } from '@base/theme-layouts/shared-components/sidePanel/store/dataSlice'

const initialMenuItems = [
  {name: 'intro', title: 'Giới thiệu', iconClass: 'fa-regular fa-browser'},
  {name: 'doc', title: 'Hướng dẫn sử dụng', iconClass: 'fa-regular fa-film'},
  {name: 'faq', title: 'Câu hỏi thường gặp', iconClass: 'fa-regular fa-cloud-question'},
  {name: 'feedback', title: 'Đánh giá & Góp ý', iconClass: 'fa-regular fa-message'},
]

function useAppConfig() {
  const basemapId = useSelector(selectBasemapId)
  const dispatch = useDispatch()

  useAsync(async () => {
    try {
      const resp = await axios.get('/api/maps/builder')

      // LAYOUT ---------------------------------------------------------------------------------
      const { side_panel } = resp.data.layout

      let menuItems = _.defaultTo(side_panel.menu, _.map(initialMenuItems, 'map')).map(name => _.find(initialMenuItems, {name})).filter(v => v)
      dispatch(addDataSidePanel({ menu: menuItems }))

      // MAP ---------------------------------------------------------------------------------
      const { config, base_layers, overlay_layers } = resp.data.map

      if (base_layers) dispatch(addBaseLayers(base_layers))
      if (overlay_layers) dispatch(addLayers(overlay_layers))
      if (config.basemap_id && basemapId) dispatch(setBasemapId(config.basemap_id))
      if (config.bounds) dispatch(setBounds(config.bounds))

      dispatch(setMapLoading(true))
    } catch (err) {
      console.error(err)
    }
  }, [])
}

export default useAppConfig