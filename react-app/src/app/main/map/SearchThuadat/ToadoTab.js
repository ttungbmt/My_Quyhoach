import {FormProvider, useFieldArray, useForm, Controller} from "react-hook-form";
import { AutocompleteField, FormStateToStore, InputField } from '@redux-form'
import {Box, Button, IconButton, Menu, MenuItem} from "@mui/material";
import Alert from '@mui/material/Alert';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useState} from "react";
import useThuadatStore from "./useThuadatStore";

const formName = 'toadoForm'

function ToadoMenu({index, actions}){
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <>
            <IconButton size="small" onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={() => {handleClose(); actions.insert(index, {x: '', y: ''})}}><i className="fa-solid fa-circle-plus text-blue mr-10 text-[20px]"></i> Thêm dòng trên</MenuItem>
                <MenuItem onClick={() => {handleClose(); actions.remove(index)}}><i className="fa-solid fa-circle-trash text-red mr-10 text-[20px]"></i> Xóa dòng này</MenuItem>
                <MenuItem onClick={() => {handleClose(); actions.insert(index+1, {x: '', y: ''})}}><i className="fa-solid fa-circle-plus text-green mr-10 text-[20px]"></i> Thêm dòng dưới</MenuItem>
            </Menu>
        </>
    )
}

function ToadoTab(){
    const getThuadatByCoords = useThuadatStore('getThuadatByCoords')

    const methods = useForm({
        defaultValues: {
            toados: [
                // {x: '1280087.18', y: '868492.60'},
                // {x: '1279796.68', y: '868640.17'},
                {x: '', y: ''},
                {x: '', y: ''},
                {x: '', y: ''},
                {x: '', y: ''},
            ],
        }
    });

    const {control, handleSubmit} = methods

    const {fields, ...actions} = useFieldArray({control, name: "toados"});

    return (
        <div className="m-12">
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(getThuadatByCoords)}>
                    <Alert severity="warning" className="text-sm flex items-center mb-20">Sử dụng hệ tọa độ Quốc gia VN2000 để tìm kiếm</Alert>

                    <AutocompleteField name="ma_tp" label="Tỉnh/ TP" url="/api/dir/hc-tinh"/>

                    <table className="mt-12 mx-12">
                        <thead>
                        <tr>
                            <th className="font-medium pr-12">#</th>
                            <th className="font-medium">Tọa độ X</th>
                            <th className="font-medium">Tọa độ Y</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {fields.map((f, index) => (
                            <tr key={f.id}>
                                <td className="w-24 pr-12"><div className="rounded-full bg-blue-400 text-white p-6 text-xs flex items-center justify-center w-20 h-20">{index+1}</div></td>
                                <td className="px-8">
                                    <InputField name={`toados.${index}.x`} variant="standard" placeholder="1199748.84"/>
                                </td>
                                <td className="px-8">
                                    <InputField name={`toados.${index}.y`} variant="standard" placeholder="611245.93"/>
                                </td>
                                <td>
                                    <ToadoMenu index={index} actions={actions}/>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <Button fullWidth className="mt-24">Tải lên tập tin tọa độ từ máy</Button>

                    <Box className="flex justify-center mt-24 gap-12">
                        <Button color="secondary" variant="outlined">Nhập lại</Button>
                        <Button color="primary" variant="outlined" type="submit">Tìm kiếm</Button>
                    </Box>

                    <FormStateToStore form={formName}/>
                </form>
            </FormProvider>
        </div>
    );
}

export default ToadoTab