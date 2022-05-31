import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import {some, includes} from 'lodash'

function MySvgIcon(props){
  const extraProps = {}

  if(props.className && some(['fa-solid', 'fa-regular', 'fa-light', 'fa-thin', 'fa-duotone'], (prefix) => includes(props.className, prefix))){
    extraProps.baseClassName = ''
  }

  return <FuseSvgIcon {...props} {...extraProps}/>
}

export default MySvgIcon