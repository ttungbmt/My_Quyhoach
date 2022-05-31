import PageSimple from '@base/theme-layouts/map/components/SidePage'
import { Alert } from '@mui/material'
import { useTitle } from '@base/hooks'

function Info({title}){
  useTitle(title)

  return (
    <PageSimple
      title={title}
      content={(
        <div className='p-12 w-full'>
          <Alert severity='info'>Đang phát triển...</Alert>
        </div>
      )}
    />
  )
}

Info.defaultProps = {
  title: 'Thông tin chi tiết'
}

export default Info