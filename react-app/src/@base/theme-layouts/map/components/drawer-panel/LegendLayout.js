import MySvgIcon from '@base/components/MySvgIcon'
import { styled } from '@mui/material/styles'
import DrawerPage from '@base/components/DrawerPage'
import { useQuery } from 'react-query'
import axios from 'axios'
import { LinearProgress, Stack } from '@mui/material'
import Box from '@mui/material/Box'

const Root = styled(DrawerPage)(({ theme, ...props }) => ({

}));

function LegendLayout({heading}){
  const { isLoading, data } = useQuery('introData', () => axios.get('/api/legend').then(res => res.data))

  return (
    <Root
      heading={heading}
      content={(
        <div className="w-full">
          {isLoading && <LinearProgress />}
          {data?.description && (<div className="mb-12 text-gray-500">{data?.description}</div>)}
          <Stack spacing={1}>
            {data?.items.map((i, k) => (
              <div className="flex" key={k}>
                <Box sx={{width: 20, height: 20, backgroundColor: i.fill_color}} className="mr-12 shrink-0"></Box>
                <Box>{i.text}</Box>
              </div>
            ))}
          </Stack>
        </div>
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