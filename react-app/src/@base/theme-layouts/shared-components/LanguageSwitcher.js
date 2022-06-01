import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage, selectCurrentLanguage, selectLanguages } from 'app/store/i18nSlice';
import clsx from 'clsx'
import Tooltip from '@base/components/Tooltip'
import ls from 'localstorage-slim'

function LanguageSwitcher(props) {
  const currentLanguage = useSelector(selectCurrentLanguage);
  const languages = useSelector(selectLanguages);
  const [menu, setMenu] = useState(null);
  const dispatch = useDispatch();

  const langMenuClick = (event) => {
    setMenu(event.currentTarget);
  };

  const langMenuClose = () => {
    setMenu(null);
  };

  function handleLanguageChange(lng) {
    dispatch(changeLanguage(lng.id));
    ls.set('LANGUAGE_CODE', lng.id, {ttl: 24*60*60}) // ttl: 1 ngày

    langMenuClose();
  }

  if(languages.length === 1) return null

  return (
    <>
      <Tooltip title="Ngôn ngữ" placement="right">
        <Button className={clsx( props.className)} onClick={langMenuClick}>
          <img
            className="mx-4 min-w-20"
            src={process.env.PUBLIC_URL + `/assets/images/flags/${currentLanguage.flag}.svg`}
            alt={currentLanguage.title}
          />
        </Button>
      </Tooltip>

      <Popover
        open={Boolean(menu)}
        anchorEl={menu}
        onClose={langMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        classes={{
          paper: 'py-8',
        }}
      >
        {languages.map((lng) => (
          <MenuItem key={lng.id} onClick={() => handleLanguageChange(lng)}>
            <ListItemIcon className="min-w-40">
              <img
                className="min-w-20"
                src={process.env.PUBLIC_URL + `/assets/images/flags/${lng.flag}.svg`}
                alt={lng.title}
              />
            </ListItemIcon>
            <ListItemText primary={lng.title} />
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}

export default LanguageSwitcher;
