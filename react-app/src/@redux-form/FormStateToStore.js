import {useDeepCompareEffect, useFirstMountState} from "react-use";
import {useFormContext, useFormState, useWatch} from "react-hook-form";
import _ from "../@lodash";
import useFormStore from "./useFormStore";
import { useLayoutEffect } from 'react'

function FormStateToStore({form}){
    const [createForm, updateForm, hasForm, getFormValues] = useFormStore('createForm, updateForm, hasForm, getFormValues')
    const isFirstMount = useFirstMountState();
    const watch = useWatch()
    const {isDirty, dirtyFields, touchedFields, isSubmitted, isSubmitSuccessful, isSubmitting, submitCount, isValid, isValidating, errors} = useFormState();
    const {setValue, control} = useFormContext();
    const formValues = getFormValues(form)
    const formState = _.cloneDeep({isDirty, dirtyFields, touchedFields, isSubmitted, isSubmitSuccessful, isSubmitting, submitCount, isValid, isValidating, errors})

    useDeepCompareEffect(() => {
        if (isFirstMount) {
            setTimeout(() => {
                formValues && _.map(formValues, (value, name) => {
                    setValue(name, value)
                })
            })
        } else {
            if (hasForm(form)) {
                updateForm(form, {values: watch, ...formState})
            } else {
                createForm(form, {initialValues: control._defaultValues, ...formState})
            }
        }
    }, [formState, watch])

return null
}

export default FormStateToStore