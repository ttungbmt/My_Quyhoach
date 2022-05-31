import { ThemeProvider } from '@mui/material/styles'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { selectFuseCurrentLayoutConfig, selectNavbarTheme } from 'app/store/fuse/settingsSlice'
import { selectFuseNavbar } from 'app/store/fuse/navbarSlice'
import NavbarStyle from './navbar/NavbarStyle'
import Hidden from '@mui/material/Hidden'
import NavbarToggleFab from '@base/theme-layouts/shared-components/NavbarToggleFab'

function SidebarWrapperLayout(props) {
  const config = useSelector(selectFuseCurrentLayoutConfig)
  const navbar = useSelector(selectFuseNavbar)

  const navbarTheme = useSelector(selectNavbarTheme)

  return (
    <>
      <ThemeProvider theme={navbarTheme}>
        <NavbarStyle />
      </ThemeProvider>

      {config.navbar.display && !navbar.open && (
        <Hidden lgDown>
          <NavbarToggleFab />
        </Hidden>
      )}
    </>
  )
}

export default memo(SidebarWrapperLayout)
