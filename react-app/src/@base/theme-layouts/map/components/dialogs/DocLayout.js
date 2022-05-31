import { Button, DialogContent, DialogTitle, LinearProgress } from '@mui/material'
import { useQuery } from 'react-query'
import axios from 'axios'
import Box from '@mui/material/Box'

function DocsLayout({ heading, closeBtn }) {
  const {
    isLoading,
    data
  } = useQuery('docData', () => axios.get('/api/pages/huong-dan-su-dung').then(res => res.data))

  return (
    <>
      <DialogTitle><span className='text-primary uppercase font-bold text-2xl'>{heading}</span> {closeBtn}</DialogTitle>
      <DialogContent className="md:min-w-[600px]">
        {isLoading && <LinearProgress />}
        <Box dangerouslySetInnerHTML={{ __html: data?.content }} />
        <div className='flex justify-center mt-20'>
          <Button variant='contained' color='primary'>Tải về PDF hướng dẫn sử dụng</Button>
        </div>
      </DialogContent>
    </>
  )
}

DocsLayout.defaultProps = {
  heading: 'Hướng dẫn sử dụng'
}

export default DocsLayout