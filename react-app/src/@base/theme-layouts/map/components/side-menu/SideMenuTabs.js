import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Tabs from "@mui/material/Tabs";
import Icon from "@mui/material/Icon";
import clsx from "clsx";
import Tab from "@mui/material/Tab";
import {styled} from "@mui/material/styles";
import {selectNavigation} from "app/store/fuse/navigationSlice";
import {navbarOpenMobile} from "app/store/fuse/navbarSlice";
import {useNavigate} from "react-router-dom";

const Root = styled('div')(({theme}) => ({
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 9999,

    '& .MuiTab-root': {
        minWidth: 'inherit',
    },
    '& .fuse-list-item-icon': {
        fontSize: 27
    },
    '& .MuiTabScrollButton-root': {
        width: 'inherit'
    }
}));

function SideMenuTabs({selectedId}){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [tab, setTab] = useState(0)
    const navigation = _.reject(useSelector(selectNavigation), {id: 'menu'});

    const handleChange = (event, newValue) => setTab(newValue)

    return (
        <Root className="shadow-2">
            <Tabs
              value={tab}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
            >
                {navigation.map((_item) => {
                    const icon = _item.icon ? (<Icon color="action" className={clsx('fuse-list-item-icon')}>{_item.icon}</Icon>) : (<i className={clsx('fuse-list-item-icon', _item.iconClass)}/>)
                    return (
                      <Tab key={_item.id} icon={icon} onClick={() => {
                          dispatch(navbarOpenMobile())
                          _item.url && navigate(_item.url)
                      }}/>
                    )
                })}
            </Tabs>

        </Root>
    )
}

export default SideMenuTabs