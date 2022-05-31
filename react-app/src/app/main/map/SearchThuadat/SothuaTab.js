import {useForm, FormProvider} from "react-hook-form";
import {AutocompleteField, FormStateToStore, InputField} from "@redux-form";
import {Box, Button} from "@mui/material";
import useThuadatStore from "./useThuadatStore";

const formName = 'sothuaForm'

function SothuaTab(){
    const getThuadatByInfo = useThuadatStore('getThuadatByInfo')
    const methods = useForm();

    return (
        <div className="p-12">
            <FormProvider {...methods}>
                <FormStateToStore form={formName}/>
                <form onSubmit={methods.handleSubmit(getThuadatByInfo)}>
                    <AutocompleteField name="ma_tp" label="Tỉnh/ TP" url="/api/dir/hc-tinh"/>
                    <AutocompleteField name="ma_qh" label="Quận huyện" url="/api/dir/hc-quan?ma_tp={ma_tp}" depends={['ma_tp']}/>
                    <AutocompleteField name="ma_px" label="Phường xã" url="/api/dir/hc-phuong?ma_qh={ma_qh}" depends={['ma_qh']}/>

                    <div className="grid grid-cols-2 gap-12">
                        <InputField name="sothua" label="Số thửa đất"/>
                        <InputField name="soto" label="Số tờ bản đồ"/>
                    </div>

                    <Box className="flex justify-center mt-12 gap-12">
                        <Button color="secondary" variant="outlined">Nhập lại</Button>
                        <Button color="primary" variant="outlined" type="submit">Tìm kiếm</Button>
                    </Box>
                </form>
            </FormProvider>
        </div>
    )
}

export default SothuaTab