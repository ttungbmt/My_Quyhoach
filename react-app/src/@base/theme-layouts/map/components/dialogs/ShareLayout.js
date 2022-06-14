import {DialogContent, DialogTitle, InputAdornment, LinearProgress, Stack, TextField} from '@mui/material'
import IconButton from "@mui/material/IconButton";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import {useCopyToClipboard} from "react-use";
import {useLocation} from "react-router-dom";

function ShareLayout({heading, closeBtn}){
    const shareLink = window.location.href
    const [state, copyToClipboard] = useCopyToClipboard();

    const socialItems = [
        {name: 'Facebook', src: 'https://maps.gstatic.com/tactile/share/facebook-logo.svg', link: `https://www.facebook.com/sharer/sharer.php?u=${shareLink}`},
        {name: 'Twitter', src: 'https://maps.gstatic.com/tactile/share/twitter-logo.svg', link: `https://twitter.com/share?url${shareLink}`},
    ]

    return (
        <>
            <DialogTitle className="text-center border-b"><span className="text-primary uppercase font-bold text-3xl">{heading}</span> {closeBtn}</DialogTitle>
            <DialogContent sx={{p: 0}}>
                <div className="mt-20">
                    <Stack spacing={4}>
                        <Box sx={{px: 3}}>
                            <TextField
                                label="Đường dẫn chia sẽ"
                                variant="standard"
                                fullWidth
                                value={shareLink}
                                InputLabelProps={{className: 'text-[16px]'}}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => copyToClipboard(shareLink)}>
                                                <FuseSvgIcon className="text-48" size={24} color="action">
                                                    material-solid:content_copy
                                                </FuseSvgIcon>
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}/>
                        </Box>
                        <Box className="flex py-24" sx={{backgroundColor: 'background.default'}}>
                            {socialItems.map(({name, src, link}, k) => (
                                <div key={name} className="flex flex-1 items-center justify-center">
                                    <div className="flex flex-col gap-6 text-[13px] text-gray-500 items-center cursor-pointer" onClick={() => window.open(link)}>
                                        <img src={src} alt={name} style={{maxWidth: 40}}/>
                                        {name}
                                    </div>
                                </div>
                            ))}
                        </Box>
                    </Stack>
                </div>
            </DialogContent>
        </>
    )
}

ShareLayout.defaultProps = {
    heading: 'Chia sẽ',
    dialogProps: {
        maxWidth: 'sm',
    }
}

export default ShareLayout