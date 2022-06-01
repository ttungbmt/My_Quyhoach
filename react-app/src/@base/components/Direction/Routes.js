import { useDispatch, useSelector } from 'react-redux'
import { selectMainRoute, setStepSelected } from '@base/components/Direction/store/routesSlice'
import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import _ from 'lodash'
import clsx from 'clsx'
import { setCenter } from '@redux-leaflet/store/configSlice'

const osrmTextInstructions = require('osrm-text-instructions')('v5')

const convertDistance = (distance) => {
  let dkm = distance/1000
  if(dkm > 1) return dkm.toFixed(1) + ' km'
  return distance + ' m'
}

const convertGuide = (step) => {
  let instruction = osrmTextInstructions.compile('vi', step, {  })

  return instruction
}

function RoutingIcon({type, modifier}){
  let iconClass = 'fa-duotone fa-circle-location-arrow'
  return <i className={clsx(iconClass, 'text-blue-500 text-[26px]')} />
}

function Routes() {
  const dispatch = useDispatch()
  const mainRoute = useSelector(selectMainRoute)

  const onPanto = (step) => {
    const location = _.cloneDeep(step.maneuver.location).reverse()
    dispatch(setStepSelected({
      location,
      ...step
    }))
    dispatch(setCenter(location))
  }

  if(!mainRoute) return null

  return (
    <div>
      <div className='p-12 flex gap-6 text-sm text-gray-500'>
        <div>{mainRoute.durationText}</div>
        <div>({mainRoute.distanceText})</div>
      </div>
      <Divider />
      <List disablePadding>
        {mainRoute.legs.map((leg, kl) => {
          return leg.steps.map((step, ks) => (
            <ListItem button key={`${kl}-${ks}`} onClick={() => onPanto(step)}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <RoutingIcon {...step.maneuver}/>
              </ListItemIcon>
              <ListItemText
                primary={convertGuide(step)}
                secondary={convertDistance(step.distance)}
                secondaryTypographyProps={{ className: 'text-sm text-gray-400 pt-4' }}
              />
            </ListItem>
          ))
        })}
      </List>
    </div>
  )
}

export default Routes