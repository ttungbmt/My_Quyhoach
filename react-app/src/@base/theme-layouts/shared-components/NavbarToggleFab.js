import clsx from "clsx";
import {navbarToggle, navbarToggleMobile} from "app/store/fuse/navbarSlice";
import Icon from "@mui/material/Icon";
import Fab from "@mui/material/Fab";
import {styled, useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useDispatch} from "react-redux";
import Tooltip from "@base/components/Tooltip";

const Root = styled('div')(({ theme }) => ({
    '& .FuseSidePanel-mobileButton': {
        height: 40,
        position: 'absolute',
        zIndex: 99,
        top: 12,
        width: 24,
        borderRadius: 38,
        padding: 8,
        backgroundColor: '#ffffffd6',
        transition: theme.transitions.create(
            ['background-color', 'border-radius', 'width', 'min-width', 'padding'],
            {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.shorter,
            }
        ),
        '&:hover': {
            width: 52,
            paddingLeft: 8,
            paddingRight: 8,
        },

        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        paddingLeft: 4,
    },
}))

function NavbarToggleFab(props){
    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down('lg'));
    const dispatch = useDispatch();

    return (
        <Root>
            <Tooltip title="Toggle side panel" placement="right" delay={150}>
                <Fab
                    className={clsx('FuseSidePanel-mobileButton', props.className)}
                    onClick={(ev) => dispatch(mdDown ? navbarToggleMobile() : navbarToggle())}
                    disableRipple
                >
                    <Icon className="button-icon" color="action">
                        keyboard_arrow_right
                    </Icon>
                </Fab>
            </Tooltip>
        </Root>
    )
}

export default NavbarToggleFab