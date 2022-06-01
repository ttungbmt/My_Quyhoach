import PageSimple from '@base/theme-layouts/map/components/SidePage'
import { Alert } from '@mui/material'
import { useTitle } from '@base/hooks'
import { useTranslation } from 'react-i18next'

function Layers({ title }) {
  const {t} = useTranslation()
  useTitle(t(title))


  return (
    <PageSimple
      title={t(title)}
      content={(
        <div className='p-12 w-full'>
          <Alert severity='info'>{t('Đang phát triển...')}</Alert>
        </div>
      )}
    />
  )
}

Layers.defaultProps = {
  title: 'Lớp dữ liệu'
}

export default Layers