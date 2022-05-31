import create from 'zustand-store-addons';
import { immer } from "zustand/middleware/immer"

const useFormStore = create(immer((set) => ({
    forms: {},

    createForm: (name, data) => set((state) => {
        state.forms[name] = {
            initialValues: {},
            values: _.isEmpty(data.initialValues) ? {} : data.initialValues,
            ...data
        }
    }),

    updateForm: (name, data) => set((state) => {
        state.forms[name] = {
            ...state.forms[name],
            ..._.cloneDeep(data)
        }
    }),
})), {
    computed: {
        getFormById: function (){
            return (id) => this.forms[id]
        },

        hasForm: function (){
            return (id) => _.has(this.forms, id)
        },

        getFormValues: function (){
            return (id) => this.getFormById(id)?.values
        },

        getFormInitialValues: function (){
            return (id) => this.getFormById(id)?.initialValues
        },

        // formValues: getFormValues('myForm')(state),
        // initialValues: getFormInitialValues('myForm')(state),
        // formSyncErrors: getFormSyncErrors('myForm')(state),
        // fields: getFormMeta('myForm')(state),
        // formAsyncErrors: getFormAsyncErrors('myForm')(state),
        // syncWarnings: getFormSyncWarnings('myForm')(state),
        // submitErrors: getFormSubmitErrors('myForm')(state),
        // formError: getFormError('myForm')(state),
        // names: getFormNames()(state),
        // dirty: isDirty('myForm')(state),
        // pristine: isPristine('myForm')(state),
        // valid: isValid('myForm')(state),
        // invalid: isInvalid('myForm')(state),
        // submitting: isSubmitting('myForm')(state),
        // submitSucceeded: hasSubmitSucceeded('myForm')(state),
        // submitFailed: hasSubmitFailed('myForm')(state)
    }
});

export default useFormStore;