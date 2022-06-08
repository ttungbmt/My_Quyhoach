import Tooltip from "@base/components/Tooltip";
import Button from "@mui/material/Button";
import clsx from "clsx";
import MySvgIcon from "@base/components/MySvgIcon";
import IconButton from "@mui/material/IconButton";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

function ActionButton({className, title, text, iconClass, onClick, visible = true}){
    if(!visible) return null

    return (
        <Tooltip title={title}>
            {text ? (
                <Button className={clsx("text-[12px] flex gap-6", className)} onClick={onClick}>
                    <MySvgIcon className={clsx('text-[18px] text-gray-600', iconClass)}/>{text}
                </Button>
            ) : (
                <IconButton className={clsx(className)} onClick={onClick}>
                    <MySvgIcon className={clsx('text-[18px] text-gray-600', iconClass)}/>
                </IconButton>
            )}
        </Tooltip>
    )
}

export default ActionButton