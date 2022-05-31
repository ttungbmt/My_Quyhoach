import {styled} from '@mui/material/styles';
import PageSimple from '@base/theme-layouts/map/components/SidePage'

const Root = styled(PageSimple)(({ theme }) => ({

}));


function ExamplePage(props) {
  return (
    <Root content={(
      <div>123</div>
    )}/>
  )
}

export default ExamplePage;
