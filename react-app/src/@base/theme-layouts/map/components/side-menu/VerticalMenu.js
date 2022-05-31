import {alpha, styled, ThemeProvider, getContrastRatio} from "@mui/material/styles";
import { useDispatch, useSelector } from 'react-redux'
import { selectMainThemeDark, selectMainTheme } from 'app/store/fuse/settingsSlice'
import { selectNavigation } from 'app/store/fuse/navigationSlice'
import Tooltip from '@base/components/Tooltip'
import { ListItem, List } from '@mui/material/index'
import NavLinkAdapter from '@fuse/core/NavLinkAdapter'
import clsx from 'clsx'
import MySvgIcon from '@base/components/MySvgIcon'
import LanguageSwitcher from '@base/theme-layouts/shared-components/LanguageSwitcher'
import { toggleSidePanel } from '@base/theme-layouts/shared-components/sidePanel/store/stateSlice'
import UserMenu from 'app/theme-layouts/shared-components/UserMenu'

const iconSize = 46

function isDark(color) {
  return getContrastRatio(color, '#ffffff') >= 3;
}

const Root = styled('div')(({theme}) => ({
  // backgroundColor: theme.palette.background.default,
  backgroundImage: 'linear-gradient(0deg, #9AD7F5 0%, #039BE5 100%)',
  color: theme.palette.text.primary,
  width: 64,
  height: '100%',
  zIndex: 30,

  '& .fuse-list-item': {
    minWidth: iconSize,
    minHeight: iconSize,
    height: iconSize,
    width: iconSize,
    borderRadius: 12,
    margin: '0 0 8px 0',
    color: alpha(theme.palette.text.primary, 0.7),
    cursor: 'pointer',
    textDecoration: 'none!important',
    // padding: 0,
    '&.type-divider': {
      padding: 0,
      height: 2,
      minHeight: 2,
      margin: '12px 0',
      backgroundColor:
        theme.palette.mode === 'light'
          ? 'rgba(0, 0, 0, .05)!important'
          : 'rgba(255, 255, 255, .1)!important',
      pointerEvents: 'none',
    },
    '&:hover': {
      color: theme.palette.text.primary,
    },
    '&.active': {
      color: theme.palette.text.primary,
      backgroundColor:
        theme.palette.mode === 'light'
          ? 'rgba(0, 0, 0, .05)!important'
          : 'rgba(255, 255, 255, .1)!important',
      // pointerEvents: 'none',
      transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
      '& .fuse-list-item-text-primary': {
        color: 'inherit',
      },
      '& .fuse-list-item-icon': {
        color: 'inherit',
      },
    },
    '& .fuse-list-item-icon': {
      color: 'inherit',
    },
    '& .fuse-list-item-text': {},
  },
}));


function VerticalMenu({selectedId}){
  const dispatch = useDispatch()
  const mainThemeDark = useSelector(selectMainThemeDark)
  const navigation = useSelector(selectNavigation);

  return (
    <ThemeProvider theme={mainThemeDark}>
      <Root>
        <List className="flex flex-col justify-between items-center h-full">
          <div className="flex flex-col">
            {navigation.map((item) => (
              <Tooltip key={item.id} title={item.title || ''} placement="right">
                <ListItem
                  button
                  component={item.url && NavLinkAdapter}
                  to={item.url}
                  end={item.end}
                  className={clsx(
                    `type-${item.type}`,
                    selectedId === item.id && 'active',
                    'fuse-list-item flex justify-center'
                  )}
                  onClick={() => {
                    item.action && dispatch(item.action)
                  }}
                >
                  {(item.icon || item.iconClass) ? (
                    <MySvgIcon
                      className={clsx('fuse-list-item-icon', item.iconClass)}
                      color="action"
                    >
                      {item.icon}
                    </MySvgIcon>
                  ) : (
                    item.title && <div className="font-bold text-16">{item.title[0]}</div>
                  )}
                </ListItem>
              </Tooltip>
            ))}
          </div>
          <div className="flex flex-col">
            <LanguageSwitcher className="fuse-list-item"/>
          </div>
        </List>
      </Root>
    </ThemeProvider>
  )
}

export default VerticalMenu