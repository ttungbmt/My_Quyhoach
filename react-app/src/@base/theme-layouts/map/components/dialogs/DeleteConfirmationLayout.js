import {DialogContent, DialogTitle, LinearProgress, Stack} from '@mui/material'
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function DeleteConfirmationLayout({heading, content, onClick, closeBtn, onClose}){

    return (
        <>
            <DialogTitle className="text-center"><span className="text-primary uppercase font-bold text-3xl">{heading}</span> {closeBtn}</DialogTitle>
            <DialogContent className="leading-8 text-base text-center">
                <Typography>{content}</Typography>

                <Stack spacing={1} className="mt-24">
                    <Button variant="contained" color="primary" onClick={onClick}>Xóa</Button>
                    <Button variant="contained" onClick={onClose}>Hủy</Button>
                </Stack>
            </DialogContent>
        </>
    )
}

DeleteConfirmationLayout.defaultProps = {
    heading: 'Xác nhận',
    content: 'Bạn chắc chắn muốn xóa dữ liệu này?',
    dialogProps: {
        maxWidth: 'xs',
        classes: { paper: 'max-w-[350px]' }
    }
}

export default DeleteConfirmationLayout