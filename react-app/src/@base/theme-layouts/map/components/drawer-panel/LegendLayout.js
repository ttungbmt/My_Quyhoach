import MySvgIcon from '@base/components/MySvgIcon'
import { styled } from '@mui/material/styles'
import DrawerPage from '@base/components/DrawerPage'
import { Alert } from '@mui/material'

const Root = styled(DrawerPage)(({ theme, ...props }) => ({

}));

function LegendLayout({heading}){
  return (
    <Root
      heading={heading}
      content={(
        <Alert severity="warning" className="w-full">Đang phát triển!</Alert>
      )}
    />
  )
}

LegendLayout.defaultProps = {
  heading: 'Chú giải',
  icon: <MySvgIcon className="fa-light fa-list"/>,
  drawerProps: {
    anchor: 'right',
    width: 320,
    variant: 'persistent'
  }
}


export default LegendLayout