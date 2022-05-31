import { CircularProgress, IconButton, List, ListItem, ListItemIcon, ListItemText, } from '@mui/material'
import { memo, useCallback, useState } from 'react'
import _ from 'lodash'
import SidePage from '@base/theme-layouts/map/components/SidePage'
import Input from '@mui/material/Input'
import Paper from '@mui/material/Paper'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import { styled } from '@mui/material/styles'
import withReducer from 'app/store/withReducer'
import reducer from './store'
import { useDebouncedEffect } from '@base/hooks'
import { selectLoading, selectQuery, selectSuggestionModels, setQuery } from './store/suggestionsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getPlace, setPlace } from './store/placeSlice'

const Root = styled(SidePage)(({ theme }) => ({
  '& .FusePageSimple-content': {
    backgroundColor: theme.palette.background.default,
  },
}));


function Search() {
  const dispatch = useDispatch()
  const loading = useSelector(selectLoading)
  const query = useSelector(selectQuery)
  const [value, setValue] = useState(query)
  const suggestions = useSelector(selectSuggestionModels)

  useDebouncedEffect(() => {
    dispatch(setQuery(value))
  }, 350, [value])

  const onGetPlace = useCallback((place) => {
    if(place.place_id) {
      dispatch(getPlace(place.toObject()))
    } else {
      dispatch(setPlace(place.toObject({virtuals: true})))
    }
  }, [])

  return (
    <Root
      title='Tìm kiếm vị trí'
      content={(
        <div>
          <div className='px-12 pt-12'>
            <Paper className='flex items-center h-44 w-full px-16 rounded-16 shadow'>
              <Input
                placeholder='Tìm kiếm vị trí...'
                disableUnderline
                fullWidth
                value={value}
                onChange={({ target }) => setValue(target.value)}
              />
              {value.length > 1 ? (
                loading ? (<CircularProgress size={28} />) : <IconButton edge='end' onClick={() => setValue('')}><FuseSvgIcon color='action'>heroicons-outline:x</FuseSvgIcon></IconButton>
              ) : (
                <FuseSvgIcon color='action'>heroicons-outline:search</FuseSvgIcon>
              )}
            </Paper>
          </div>

          <List>
            {_.map(suggestions, (place, k) => {
              return (
                <ListItem key={k} button onClick={() => onGetPlace(place)}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <svg width={24} height={24} xmlns='http://www.w3.org/2000/svg'>
                      <path fillRule='evenodd'
                            d='M12 1a9 9 0 014.252 16.933c-1.719.918-3.151 2.893-3.77 4.704h-.001a.502.502 0 01-.962 0h-.001c-.619-1.811-2.051-3.786-3.77-4.704A9 9 0 0112 1zm0 6a3 3 0 110 6 3 3 0 010-6z'
                            fill='#fe9746' />
                    </svg>
                  </ListItemIcon>
                  <ListItemText
                    primary={place.main_text}
                    secondary={_.upperFirst(place.secondary_text)}
                    secondaryTypographyProps={{ className: 'text-sm text-gray-500 pt-4' }}
                  />
                </ListItem>
              )
            })}
          </List>

        </div>
      )}
    />
  )
}

export default withReducer('search', reducer)(memo(Search));