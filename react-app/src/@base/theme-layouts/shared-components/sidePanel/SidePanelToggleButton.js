import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import {toggleSidePanel} from "./store/stateSlice";
import { components } from '@base/components/Layout'
import Tooltip from '@base/components/Tooltip'
import { useTranslation } from 'react-i18next'

function SidePanelToggleButton({name, ...props}) {
  const {t} = useTranslation()
  const dispatch = useDispatch();
  const icon = _.get(components, `${name}.defaultProps.icon`)
  const heading = _.get(components, `${name}.defaultProps.heading`)

  return (
    <Tooltip title={t(heading)}>
      <IconButton className="w-40 h-40" onClick={(ev) => dispatch(toggleSidePanel(name))} size="large">
        {props.children ?? (icon ?? <FuseSvgIcon>heroicons-outline:bookmark</FuseSvgIcon>)}
      </IconButton>
    </Tooltip>

  );
}

export default SidePanelToggleButton;
