import { styled } from '@mui/material/styles'
import FusePageSimple from '@fuse/core/FusePageSimple/FusePageSimple'
import SideHeader from '@base/theme-layouts/map/components/SideHeader'
import { useTitle } from '@base/hooks'

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
  },
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {
    backgroundColor: theme.palette.background.paper,
    display: 'block'
  },
}));

function SidePage({className, title, content, toolbar}){
  useTitle(title)

  return (
    <Root
      className={className}
      header={(
        <>
          <SideHeader title={title}/>
          {toolbar && (
            <>
              <div className="border-b w-full"></div>
              {toolbar}
            </>
          )}
        </>
      )}
      content={content}
      scroll="content"
    />
  );
}

export default SidePage