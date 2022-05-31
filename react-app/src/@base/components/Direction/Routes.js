import { useDispatch, useSelector } from 'react-redux'
import { selectMainRoute, setStepSelected } from '@base/components/Direction/store/routesSlice'
import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import _ from 'lodash'
import clsx from 'clsx'
import { setCenter } from '@redux-leaflet/store/configSlice'

const convertDistance = (distance) => {
  let dkm = distance/1000
  if(dkm > 1) return dkm.toFixed(1) + ' km'
  return distance + ' m'
}

const convertGuide = ({name, rotary_name, maneuver: {type, modifier}}) => {
  if(type === 'turn') {

    if(modifier === 'straight') return `Go straight ${name.length ? `onto ${name}` : name}`
    else if(modifier === 'right') return `Turn right ${name.length ? `onto ${name}` : name}`
    else if(modifier === 'slight right') return `Make a slight right ${name ? `onto ${name}` : name}`
    else if(modifier === 'left') return `Turn left ${name.length ? `onto ${name}` : name}`
    else if(modifier === 'slight left') return `Make a slight left ${name.length ? `onto ${name}` : name}`

  } else if(type === 'new name') {

    if(modifier === 'straight') return `Continue onto ${name}`

  }  else if(type === 'depart') {

  }  else if(type === 'arrive') {

    if(modifier === 'right') return `You have arrived at your destination, on the right`
    else if(modifier === 'left') return `You have arrived at your destination, on the left`
    else if(_.isUndefined(modifier)) return `You have arrived at your destination`

  }  else if(type === 'merge') {

    if(modifier === 'slight right') return `Merge right onto ${name}`
    else if(modifier === 'slight left') return `Merge left onto ${name}`

  }  else if(type === 'ramp') {

  }  else if(type === 'on ramp') {

  }  else if(type === 'off ramp') {

    return `Take the ramp`

  }  else if(type === 'fork') {

    if(modifier === 'slight right') return `Keep right onto ${name}`
    else if(modifier === 'slight left') return `Keep left onto ${name}`


  }  else if(type === 'end of road') {

    if(modifier === 'straight') return `Go straight onto ${name}`
    else if(modifier === 'right') return `Turn right onto ${name}`
    else if(modifier === 'left') return `Turn left onto ${name}`

  }  else if(type === 'use lane') {

  }  else if(type === 'continue') {

    if(modifier === 'uturn') return `Make a U-turn and continue on ${name}`
    if(modifier === 'slight right') return `Make a slight right to stay on ${name}`
    else if(modifier === 'slight left') return `Continue slightly left onto ${name}`

  }  else if(type === 'roundabout') {

  }  else if(type === 'rotary') {

    if(modifier === 'right') return `Enter ${rotary_name} and take the exit onto  ${name}`
    else if(modifier === 'slight right') return `Enter ${rotary_name} and take the exit onto ${name}`

  }  else if(type === 'roundabout turn') {

  }  else if(type === 'notification') {

  }  else if(type === 'exit roundabout') {

  }  else if(type === 'exit rotary') {

    return `Exit the traffic circle onto ${name}`

  }

  return `${type}|${modifier}: ${name}`
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