import {useForm, FormProvider} from "react-hook-form";
import { AutocompleteField, FormStateToStore, InputField, TextField } from '@redux-form'
import { Box, Button, Stack } from '@mui/material'
import useThuadatStore from "./useThuadatStore";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const formName = 'sothuaForm'

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    ma_tp: yup.string().required('Bắt buộc chọn thông tin Tỉnh/TP'),
    ma_qh: yup.string().required('Bắt buộc chọn thông tin Quận/Huyện'),
    ma_px: yup.string().required('Bắt buộc chọn thông tin Phường/Xã'),
    sothua: yup.string().required('Bắt buộc nhập thông tin số thửa'),
    soto: yup.string().required('Bắt buộc nhập thông tin số tờ'),
});

function SothuaTab(){
    const getThuadatByInfo = useThuadatStore('getThuadatByInfo')
    const methods = useForm({
        defaultValues: {
            // ma_tp: '79'
        },
        resolver: yupResolver(schema),
    });

    const { reset, handleSubmit } = methods

    return (
        <div className="p-12">
            <FormProvider {...methods}>
                <form className="mt-12" onSubmit={handleSubmit(getThuadatByInfo)}>
                    <Stack spacing={1.5}>
                        <AutocompleteField name="ma_tp" label="Tỉnh/ TP" url="/api/dir/hc-tinh" queryKey="dirTinhTp"/>
                        <AutocompleteField name="ma_qh" label="Quận huyện" url="/api/dir/hc-quan?ma_tp={ma_tp}" depends={['ma_tp']} />
                        <AutocompleteField name="ma_px" label="Phường xã" url="/api/dir/hc-phuong?ma_qh={ma_qh}" depends={['ma_qh']}/>

                        <div className="grid grid-cols-2 gap-12">
                            <TextField name="sothua" label="Số thửa đất"/>
                            <TextField name="soto" label="Số tờ bản đồ"/>
                        </div>

                        <Box className="flex justify-center gap-12 pt-12">
                            <Button color="secondary" variant="outlined" onClick={() => reset()}>Nhập lại</Button>
                            <Button color="primary" variant="outlined" type="submit">Tìm kiếm</Button>
                        </Box>
                    </Stack>
                </form>
                <FormStateToStore form={formName}/>
            </FormProvider>
        </div>
    )
}

export default SothuaTab