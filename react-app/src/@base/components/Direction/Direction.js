import PageSimple from '@base/theme-layouts/map/components/SidePage'
import { Alert, InputAdornment, List, ListItem, ListItemIcon, ListItemText, OutlinedInput, Stack } from '@mui/material'
import { useDebouncedCallback, useDebouncedEffect, useTitle } from '@base/hooks'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import IconButton from '@mui/material/IconButton'
import MySvgIcon from '@base/components/MySvgIcon'
import clsx from 'clsx'
import Tooltip from '@base/components/Tooltip'
import { useDispatch, useSelector } from 'react-redux'
import withReducer from 'app/store/withReducer'
import { memo, useCallback, useRef, useState } from 'react'
import reducer from './store'
import { setWaypoints, selectWaypoints } from './store/waypointsSlice'
import { selectTravelModes, setTravelModeId } from './store/routesSlice'
import { TextField } from '@redux-form'
import { FormProvider, useFieldArray, useForm, useFormContext, useWatch } from 'react-hook-form'
import { styled } from '@mui/material/styles'
import { useGeolocation, usePrevious, useUpdateEffect } from 'react-use'
import Divider from '@mui/material/Divider'
import _ from 'lodash'
import {
  getSuggestions,
  removeSuggestions,
  selectSelectedId,
  selectSuggestionsSelected,
  setSelectedId
} from './store/sugesstionsSlice'
import { providers } from '@base/components/Search'
import { searchRoutes } from '@base/components/Direction/store/routesSlice'
import Routes from './Routes'

const formName = 'directionForm'

const Root = styled(PageSimple)(({ theme, config }) => ({
  '& .MuiOutlinedInput-input': {
    padding: '10.5px 14px'
  }
}))

const defaultWaypoints = [
  {text: ''},
  {text: ''},
]

function Direction({title}){
  const timerRef = useRef()
  const dispatch = useDispatch()
  const selectedId = useSelector(selectSelectedId)
  const travelModes = useSelector(selectTravelModes)
  const waypoints = useSelector(selectWaypoints)
  const suggestionsSelected = useSelector(selectSuggestionsSelected)
  const geolocation = useGeolocation();

  const methods = useForm({
    defaultValues: {
      waypoints: _.isEmpty(waypoints) ? defaultWaypoints: waypoints,
    }
  });

  useTitle(title)

  const {control, register, setValue, watch, handleSubmit, reset, resetField} = methods

  const {fields, ...fieldActions} = useFieldArray({control, name: 'waypoints'});

  const onSubmit = (values) => dispatch(setWaypoints(values.waypoints))

  const waypointValues = _.cloneDeep(watch('waypoints'))
  const prevWaypoints = usePrevious(waypoints);

  useDebouncedEffect(() => {
    _.map(waypointValues, (v, index) => {
      if (!_.isNil(prevWaypoints[index]?.text) && prevWaypoints[index]?.text !== waypointValues[index]?.text) {
        let query = waypointValues[index]?.text

        if (query.length && !v.location) {
          dispatch(getSuggestions({
            selectedId: index,
            query
          }))
        }

        if(!query.length && !_.isEmpty(suggestionsSelected)){
          dispatch(removeSuggestions(index))
        }
      }
    })

    dispatch(setWaypoints(_.cloneDeep(waypointValues)))
  }, 400, [JSON.stringify(waypointValues)])

  const dirActions = [
    {
      iconClass: 'fa-regular fa-trash-can',
      title: 'Xóa lộ trình',
      onClick: () => {
        reset({waypoints: defaultWaypoints})
      }},
  ]

  const onFocus = (id) => {
    clearTimeout(timerRef.current)
    dispatch(setSelectedId(id))
  }

  const onBlur = (id) => {
    timerRef.current = setTimeout(() => {
      dispatch(setSelectedId(null))
    }, 200)
  }

  const onSetGeolocation = () => {
    setValue(`waypoints.${selectedId}`, {
      ...waypointValues[selectedId],
      text: 'Vị trí của bạn',
      location: [geolocation.latitude, geolocation.longitude]
    })

    dispatch(searchRoutes())
  }


  const onClickSuggestion = async (place) => {
    const result = await (new providers['meeymap']).place({ place_id: place.place_id });

    const location = result.geometry.location

    setValue(`waypoints.${selectedId}`, {
      ...waypointValues[selectedId],
      text: result.formatted_address,
      location: [location.lat, location.lng]
    })

    dispatch(searchRoutes())
  }


  return (
    <Root
      title={title}
      toolbar={(
        <div>
          <div className="flex justify-between px-12 py-4">
            <Stack direction="row">
              {travelModes.map((i, k) => (
                <Tooltip title={i.title} key={k}>
                  <IconButton  className='self-center' onClick={() => dispatch(setTravelModeId(i.mode))}>
                    <MySvgIcon size={26} color='action' className={clsx(i.iconClass, 'overflow-visible', {'text-gray-600': i.selected})} />
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>
            <Stack direction="row">
              {dirActions.map((i, k) => (
                <Tooltip title={i.title} key={k}>
                  <IconButton key={k} className='self-center' onClick={i.onClick}>
                    <MySvgIcon size={26} color='action' className={clsx('text-[18px] text-gray-400', i.iconClass)} />
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>
          </div>

          <Divider />

          <FormProvider {...methods}>
            <form className="px-12 py-12" onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                {fields.map((field, index) => {
                  let placeholder = 'Chọn điểm đi qua',
                    icon = 'heroicons-solid:minus-circle',
                    color = 'disabled',
                    onClick = (index) => fieldActions.remove(index)

                  if(index === 0) {
                    placeholder = 'Chọn điểm xuất phát'
                    icon = 'heroicons-solid:switch-vertical'
                    color = 'action'
                    onClick = (index) => fieldActions.swap(index, fields.length - 1)
                  }
                  else if(index === (fields.length - 1)) {
                    placeholder = 'Chọn điểm đến'
                    icon = 'heroicons-solid:plus-circle'
                    color = 'primary'
                    onClick = (index) => fieldActions.insert(index, {text: ''})
                  }

                  return (
                    <div key={field.id} className="flex gap-6">
                      <input type="hidden" {...register(`waypoints.${index}.id`)} value={field.id}/>
                      <TextField
                        type="search"
                        name={`waypoints.${index}.text`}
                        placeholder={placeholder}
                        autoComplete="off"
                        fullWidth
                        onFocus={e => onFocus(index)}
                        onBlur={e => onBlur(index)}
                        onClear={e => {
                          setValue(`waypoints.${index}`, {
                            ..._.pick(field, ['id', 'text']),
                            text: ''
                          })
                        }}
                      />
                      <div className="min-w-32">
                        {index < 4 && (
                          <IconButton className='self-center' size='small' onClick={() => onClick(index)}>
                            <FuseSvgIcon size={26} color={color}>{icon}</FuseSvgIcon>
                          </IconButton>
                        )}
                      </div>
                    </div>
                  )
                })}

              </Stack>
            </form>
          </FormProvider>
        </div>
      )}
      content={(
        <div className='w-full'>
          {!_.isNil(selectedId) && _.isEmpty(suggestionsSelected) && (
            <List disablePadding>
              <ListItem button onClick={onSetGeolocation}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <i className="fa-duotone fa-circle-location-arrow text-orange text-[26px]" />
                </ListItemIcon>
                <ListItemText primary={'Vị trí của bạn'} />
              </ListItem>
            </List>
          )}

          <List disablePadding>
            {_.map(suggestionsSelected, (place, k) => {
              return (
                <ListItem key={k} button onClick={() => onClickSuggestion(place)}>
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

          <Routes/>
        </div>
      )}
    />
  )
}

Direction.defaultProps = {
  title: 'Kế hoạch lộ trình'
}

export default withReducer('direction', reducer)(memo(Direction));
