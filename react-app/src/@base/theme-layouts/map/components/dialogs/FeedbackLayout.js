import { Alert, Box, Button, DialogContent, DialogTitle, LinearProgress, Stack } from '@mui/material'
import { FormStateToStore, InputField, RatingField, TextField } from '@redux-form'
import {FormProvider, useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios'
import { useEffect, useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { useUnmount, useUpdateEffect } from 'react-use'
import { useSelector } from 'react-redux'
import { selectFuseDialogState } from 'app/store/fuse/dialogSlice'

const schema = yup.object({
    content: yup.string().required(),
    hoten: yup.string().required(),
    email: yup.string().email().required(),
}).required();

function FeedbackLayout({heading, closeBtn, onClose}){
    const open = useSelector(selectFuseDialogState)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const methods = useForm({
        defaultValues: {},
        resolver: yupResolver(schema)
    });

    useUpdateEffect(() => {
        if(!open) setTimeout(() => {
            methods.reset()
            setMessage(null)
        }, 200)
    }, [open])

    const onSubmit = async (values) => {
        setLoading(true)
        try {
            let res = await axios.post('/api/feedbacks', values);

            if(res.data.id) {
                methods.reset()
                setMessage(`Nội dung đánh giá và góp ý đã được gửi đi. Xin chân thành cảm ơn bạn đã dành thời gian đóng góp để ứng dụng được tốt hơn`)
            }

            setLoading(false)
        } catch (err) {
            console.log(err);
            setLoading(false)
        }
    }

    return (
        <>
            <DialogTitle className="text-center" sx={{pr: 6}}>
                <span className="text-primary uppercase font-bold text-2xl">{heading}</span> {closeBtn}
            </DialogTitle>
            <DialogContent>
                {loading && <LinearProgress />}

                <FormProvider {...methods}>
                    {message ? (
                      <Alert severity="success">
                          {message}
                      </Alert>
                    ) : (
                      <form onSubmit={methods.handleSubmit(onSubmit)}>
                          <Stack spacing={1.8}>
                              <RatingField name="rating" label="Mức độ hài lòng về thông tin được cung cấp" className="ml-0" labelPlacement="start"/>
                              <TextField name="content" label="Nội dung góp ý" placeholder="Nhập tại đây (giới hạn 100 từ)" multiline rows={4}/>
                              <TextField name="hoten" label="Họ tên"/>
                              <TextField name="email" type="email" label="Email"/>

                              <Box className="flex justify-center pt-6 gap-12">
                                  <Button color="secondary" variant="outlined" onClick={() => onClose()}>Hủy bỏ</Button>

                                  <LoadingButton sx={{minWidth: loading ? 100 : 'inherit'}} loading={loading} type="submit" color="primary" loadingIndicator="Loading..." variant="outlined">
                                      Gửi đi
                                  </LoadingButton>
                              </Box>
                          </Stack>
                      </form>
                    )}
                </FormProvider>
            </DialogContent>
        </>
    )
}

FeedbackLayout.defaultProps = {
    heading: 'Đánh giá & Góp ý',
    dialogProps: {
        maxWidth: 'sm',
        classes: { paper: 'max-w-[500px]' }
    }
}

export default FeedbackLayout