import {memo} from 'react'
import {useFormContext, useFormState, useWatch} from "react-hook-form";
import {updateForm, selectFormsById} from './formsSlice'
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {useDeepCompareEffect, useFirstMountState} from 'react-use';
import _ from '@lodash'

function FormStateToRedux({form}){
    const dispatch = useDispatch()
    const isFirstMount = useFirstMountState();
    const watch = useWatch()
    const formState = _.cloneDeep(useFormState());
    const {setValue, control} = useFormContext();
    const reduxFormState = useSelector(state => form ? selectFormsById(state, form) : null, shallowEqual)

    useDeepCompareEffect(() => {
        if(isFirstMount && reduxFormState) {
            _.map(reduxFormState.values, (value, name) => setValue(name, value))
        } else {
            dispatch(updateForm(form, {
                initialValues: control.defaultValuesRef.current,
                values: watch,
                ...formState,
            }))
        }
    }, [formState, watch])

    return null
}

export default memo(FormStateToRedux)