import {Box, Button, DialogContent, DialogTitle} from "@mui/material";
import {FormStateToStore, InputField, RatingField} from "@redux-form";
import {FormProvider, useForm} from "react-hook-form";
import * as React from "react";

const formName = 'feedbackForm'

function FeedbackLayout({heading, closeBtn, onClose}){
    const methods = useForm();

    const onSubmit = async (val) => {
        console.log(val)
    }

    return (
        <>
            <DialogTitle className="text-center" sx={{pr: 6}}>
                <span className="text-primary uppercase font-bold text-2xl">{heading}</span> {closeBtn}
            </DialogTitle>
            <DialogContent>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <RatingField name="mucdo_hl" label="Mức độ hài lòng về thông tin được cung cấp" className="ml-0" labelPlacement="start"/>

                        <InputField name="noidung" label="Nội dung góp ý" placeholder="Nhập tại đây (giới hạn 100 từ)" multiline rows={4}/>
                        <InputField name="hoten" label="Họ tên"/>
                        <InputField name="email" type="email" label="Email"/>

                        <Box className="flex justify-center pt-6 gap-12">
                            <Button color="secondary" variant="outlined" onClick={() => {
                                onClose()
                                methods.reset()
                            }}>Hủy bỏ</Button>
                            <Button color="primary" variant="outlined" type="submit">Gửi đi</Button>
                        </Box>
                    </form>

                    <FormStateToStore form={formName}/>
                </FormProvider>
            </DialogContent>
        </>
    )
}

FeedbackLayout.defaultProps = {
    heading: 'Đánh giá & Góp ý',
    dialogProps: {
        maxWidth: 'sm'
    }
}

export default FeedbackLayout