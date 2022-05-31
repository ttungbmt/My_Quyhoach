import { useSelector } from 'react-redux'
import {styled} from "@mui/material/styles";
import Hidden from '@mui/material/Hidden'
import VerticalMenu from './VerticalMenu'
import { useLocation } from 'react-router-dom'
import { selectNavigation } from 'app/store/fuse/navigationSlice'
import { useEffect, useState } from 'react'
import SideMenuTabs from './SideMenuTabs'

function needsToBeOpened(location, item) {
  return location && (isUrlInChildren(item, location.pathname) || isUrlInChildren({children: [item]}, location.pathname));
}

function isUrlInChildren(parent, url) {
  if (!parent.children) {
    return false;
  }

  for (let i = 0; i < parent.children.length; i += 1) {
    if (parent.children[i].children) {
      if (isUrlInChildren(parent.children[i], url)) {
        return true;
      }
    }
    if (parent.children[i].url === url || url.includes(parent.children[i].url)) {
      return true;
    }
  }

  return false;
}

function SideMenu(){
  const navigation = useSelector(selectNavigation);
  const [selectedNavigation, setSelectedNavigation] = useState([]);
  const location = useLocation();

  useEffect(() => {
    navigation?.forEach((item) => {
      if (needsToBeOpened(location, item)) {
        setSelectedNavigation([item]);
      }
    });
  }, [navigation, location]);

  function handleParentItemClick(selected) {
    /** if there is no child item do not set/open panel
     */
    if (!selected.children) {
      setSelectedNavigation([]);
      return;
    }

    /**
     * If navigation already selected toggle panel visibility
     */
    if (selectedNavigation[0]?.id === selected.id) {
    } else {
      /**
       * Set navigation and open panel
       */
      setSelectedNavigation([selected]);
    }
  }

  return (
    <>
      <Hidden lgDown>
        <VerticalMenu selectedId={selectedNavigation[0]?.id}/>
      </Hidden>
      <Hidden lgUp>
        <SideMenuTabs selectedId={selectedNavigation[0]?.id}/>
      </Hidden>
    </>
  )
}

export default SideMenu