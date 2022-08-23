import SidePage from '@base/theme-layouts/map/components/SidePage'
import {Box, Button, Stack} from "@mui/material";
import {AutocompleteField, FormStateToStore, TextField} from "@redux-form";
import {FormProvider, useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import useDrawStore from "@base/theme-layouts/map/components/map/DrawControl/useDrawStore";
import {useLocation} from "react-router-dom";
import URI from 'urijs';

const formName = 'sothuaForm'

const schema = yup.object().shape({
    name: yup.string().required('Bắt buộc nhập tên'),
});

function MyDataForm(){
    const location = useLocation()
    const layers = useDrawStore('layers')

    const methods = useForm({
        defaultValues: {},
        resolver: yupResolver(schema),
    });

    const { reset, handleSubmit } = methods

    const onSubmit = (values) => {
        let elementId = _.get(URI(location.search).search(true), 'elementId'),
            layer = _.find(layers, {_leaflet_id: _.toInteger(elementId)})

        console.log({
            ...values,
            geometry: layer.toGeoJSON().geometry
        })

    }


    return (
        <SidePage
            title="Thêm mới dữ liệu"
            content={(
                <Box px={1.5} py={1}>
                    <FormProvider {...methods}>
                        <form className="mt-12" onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={2}>
                                <TextField name="name" label="Tên vị trí"/>
                                <TextField name="description" label="Ghi chú" multiline rows={4}/>

                                <Box className="flex justify-center gap-12 pt-12">
                                    <Button color="secondary" variant="outlined" onClick={() => reset()}>Xóa</Button>
                                    <Button color="primary" variant="outlined" type="submit">Lưu dữ liệu</Button>
                                </Box>
                            </Stack>
                        </form>
                        <FormStateToStore form={formName}/>
                    </FormProvider>
                </Box>
            )}
        />
    )
}

export default MyDataForm