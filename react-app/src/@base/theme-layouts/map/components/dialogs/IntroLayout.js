import { CircularProgress, DialogContent, DialogTitle, LinearProgress } from '@mui/material'
import { useQuery } from 'react-query'
import axios from 'axios'
import Box from '@mui/material/Box'

function IntroLayout({heading, closeBtn}){
  const { isLoading, data } = useQuery('introData', () => axios.get('/api/pages/gioi-thieu-phan-mem').then(res => res.data))

  return (
    <>
      <DialogTitle className="text-center"><span className="text-primary uppercase font-bold text-3xl">{heading}</span> {closeBtn}</DialogTitle>
      <DialogContent className="leading-8 text-base md:min-w-[900px] min-h-[60px]" sx={{
        px: {md: 10}, pb: 4,
      }}>
        {isLoading && <LinearProgress sx={{mt: 1}}/>}
        <Box sx={{
          '& strong': {fontWeight: 600},
          '& > p': {pb: 2}
        }} className="text-[16px]" dangerouslySetInnerHTML={{ __html: data?.content }} />
      </DialogContent>
    </>
  )
}

IntroLayout.defaultProps = {
  heading: 'Giới thiệu phần mềm'
}

export default IntroLayout