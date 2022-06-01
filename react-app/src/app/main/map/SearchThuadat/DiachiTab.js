import {FormStateToStore, InputField} from "@redux-form";
import { IconButton, InputAdornment, List, ListItem, ListItemIcon, ListItemText, } from "@mui/material";
import {FormProvider, useForm} from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import useFormStore from "@redux-form/useFormStore";
import {useDebounce, useUpdateEffect} from "react-use";
import useThuadatStore from "./useThuadatStore";
import _ from "lodash";
import Alert from '@mui/material/Alert'


const formName = 'diachiForm'

function DiachiTab(){
    const getFormValues = useFormStore('getFormValues')
    const formValues = getFormValues(formName)
    const val = _.defaultTo(formValues?.diachi, '')
    const [autoSuggestData, setQuery, autoSuggest, getPlace] = useThuadatStore('autoSuggestData, setQuery, autoSuggest, getPlace')
    const methods = useForm({

    });

    useDebounce(
        () => {
            setQuery(val);
            autoSuggest()
        },
        400,
        [val]
    );

    const onSubmit = async (val) => {
        console.log(val)
    }

    const onReset = () => methods.reset()

    return (
        <div>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="p-12">
                    <InputField name="diachi" label="Địa chỉ" InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {val.length > 1 ? (<IconButton edge="end" onClick={onReset}><CloseIcon/></IconButton>) : (<SearchIcon/>)}
                            </InputAdornment>
                        ),
                    }}/>


                    <FormStateToStore form={formName}/>
                </form>
            </FormProvider>

            {_.isEmpty(autoSuggestData) && <Alert severity="info" className="mx-12 text-sm flex items-center">Bạn vui lòng nhập từ khóa (địa chỉ, vị trí, tọa độ) để tra cứu thửa đất</Alert>}

            {!_.isEmpty(autoSuggestData) && (
                <div className="border-t border-b">
                    <List className="divide-y p-0">
                        {_.map(autoSuggestData, (place, k) => {
                            return (
                                <ListItem key={k} button sx={{border: 'inherit'}} onClick={() => getPlace(place.place_id)}>
                                    <ListItemIcon sx={{minWidth: 36}}>
                                        <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M12 1a9 9 0 014.252 16.933c-1.719.918-3.151 2.893-3.77 4.704h-.001a.502.502 0 01-.962 0h-.001c-.619-1.811-2.051-3.786-3.77-4.704A9 9 0 0112 1zm0 6a3 3 0 110 6 3 3 0 010-6z" fill="#fe9746" />
                                        </svg>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={place.main_text}
                                        secondary={_.upperFirst(place.secondary_text)}
                                        secondaryTypographyProps={{className: 'text-sm text-gray-500 pt-4'}}
                                    />
                                </ListItem>
                            )
                        })}
                    </List>
                </div>
            )}
        </div>
    )
}

export default DiachiTab