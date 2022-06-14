import {DialogContent, DialogTitle, LinearProgress, Stack} from '@mui/material'
import {FormProvider, useForm} from "react-hook-form";
import {TextField} from "@redux-form";
import Button from "@mui/material/Button";
import useThuadatStore from "../SearchThuadat/useThuadatStore";

const formName = 'saveThuadatForm'

function SaveThuadatLayout({heading, closeBtn, onClose, ...a}){
    const methods = useForm();
    const {handleSubmit} = methods
    const feature = useThuadatStore('feature')

    console.log(a)

    return (
        <>
            <DialogTitle className="text-center border-b"><span className="text-primary uppercase font-bold text-3xl">{heading}</span> {closeBtn}</DialogTitle>
            <DialogContent>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(values => {})} className="pt-24">
                        <Stack spacing={2}>
                            {feature && (
                                <span className="text-blue-500 font-medium">Tờ {feature.soto} Thửa {feature.sothua}, {feature.quanhuyen}, {feature.phuongxa}, {feature.tinh_tp}</span>
                            )}
                            <TextField name="ghichu" label="Ghi chú" multiline rows={4}/>
                            <div className="flex gap-12 pt-12 justify-end">
                                <Button variant="contained" onClick={onClose}>Hủy</Button>
                                <Button variant="contained" color="primary">Lưu</Button>
                            </div>
                        </Stack>
                    </form>
                </FormProvider>

            </DialogContent>
        </>
    )
}

SaveThuadatLayout.defaultProps = {
    heading: 'Lưu thửa đất',
    dialogProps: {
        maxWidth: 'sm',
    }
}

export default SaveThuadatLayout