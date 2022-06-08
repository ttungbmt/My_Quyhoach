import { styled, ThemeProvider } from '@mui/material/styles'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import withReducer from 'app/store/withReducer'
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectSidePanelData } from './store/dataSlice'
import reducer from './store'
import { selectSidePanelState, toggleSidePanel } from './store/stateSlice'
import { selectMainThemeDark, selectMainTheme } from 'app/store/fuse/settingsSlice'
import Layout, { components } from '@base/components/Layout'

const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme, width }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    width
  }
}))

function SidePanel(props) {
  const mainThemeDark = useSelector(selectMainThemeDark)
  const mainTheme = useSelector(selectMainTheme)
  const dispatch = useDispatch()

  const data = useSelector(selectSidePanelData)
  const { open, name } = useSelector(selectSidePanelState)
  const drawerProps = _.get(components, `${name}.defaultProps.drawerProps`, {})

  return (
    <ThemeProvider theme={drawerProps.mode === 'dark' ? mainThemeDark : mainTheme}>
      <StyledSwipeableDrawer
        PaperProps={{className: 'shadow-lg border-l-0'}}
        width={300}
        open={open}
        anchor='left'
        onOpen={(ev) => {}}
        onClose={(ev) => dispatch(toggleSidePanel(name))}
        disableSwipeToOpen
        ModalProps={{
          keepMounted: false,
        }}
        {...drawerProps}
      >
        <Layout name={name} data={_.get(data, name)}/>
      </StyledSwipeableDrawer>
    </ThemeProvider>
  )
}

export default withReducer('sidePanel', reducer)(memo(SidePanel))
