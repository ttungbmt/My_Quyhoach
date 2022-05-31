import {FormProvider} from "react-hook-form";
import React, {memo} from "react";
import {FormStateToRedux} from "./index";
import PropTypes from "prop-types";

function Form({name, children, onSubmit, ...methods}) {
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {children}
                <FormStateToRedux form={name}/>
            </form>
        </FormProvider>
    )
}

Form.propTypes = {
    name: PropTypes.string.isRequired
};

export default memo(Form)