import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    DialogContent,
    DialogTitle, Typography
} from "@mui/material";
import { styled } from '@mui/material/styles';
import DocsLayout from '@base/theme-layouts/map/components/dialogs/DocLayout'

const StyledAccordion = styled(Accordion)(({ theme }) => ({
    margin: 0,
    border: 'none!important',
    borderRadius: '8px!important',
    marginBottom: 24,
    '&:before': {
        display: 'none',
    },
    '&:first-of-type': {},
    '&:last-of-type': {
        marginBottom: 0,
    },
}));

function FAQLayout({heading, closeBtn}){
    const faqs = [
        {title: 'Tại sao nhấn định vị trên ứng dụng iOS nhưng lại không thấy vị trí hiện tại của mình?', body: `<p> Ở lần đầu chạy và nhấn định vị, ứng dụng sẽ mở hộp thoại xin quyền truy cập vị trí, người dùng cần chọn cho phép để iOS cấp quyền sử dụng tính năng này. Trong trường hợp quên cho phép ở lần đầu hoặc iDevice bật chế độ <strong>Restrictions</strong>, người dùng cần chỉnh tay như sau:<br> Vào <strong>Settings (Cài đặt)</strong> &gt; chọn <strong>Privacy (Quyền riêng tư)</strong> &gt; chọn <strong>Location Services (Dịch vụ định vị)</strong> &gt; Chọn <code>TTQH HCM</code> để kích hoạt chế độ Dịch vụ định vị.                                        </p>`},
        {title: 'Tại sao gõ số tờ - số thửa trong sổ đỏ mà ứng dụng không tìm ra được khu đất?', body: ` <p> Dữ liệu số tờ - số thửa của ứng dụng dựa trên dữ liệu địa chính năm 2003-2005 của Sở Tài nguyên - Môi trường. Cho đến nay vẫn chưa có dữ liệu chỉnh lý cập nhật dữ liệu địa chính. Việc người dùng không tìm kiếm được khu đất ứng với số tờ - số thửa trên sổ đỏ hoặc bản đồ hiện trạng vị trí của mình có thể do một trong hai nguyên nhân sau: </p><ul> <li>Thửa đất được chia tách sau khi có dữ liệu địa chính năm 2003-2005.</li> <li>Sổ đỏ hoặc bản đồ địa chính được cấp trước khi có bản đồ địa chính năm 2003 - 2005 và dùng bản đồ địa chính cũ.</li> </ul>                                        <p></p>`},
    ]

    return (
        <>
            <DialogTitle sx={{pr: 6}}>
                <span className="text-primary uppercase font-bold text-2xl">{heading}</span> {closeBtn}
            </DialogTitle>
            <DialogContent sx={{backgroundColor: 'background.default', pt: '16px!important'}}>
                {faqs.map(({title, body}, k) => (
                    <StyledAccordion key={k}>
                        <AccordionSummary>
                            <div className="flex py-4">
                                <i className="fa-light fa-circle-question text-[20px]"></i>
                                <Typography className="px-12 font-medium">{k+1}. {title}</Typography>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails className="pt-0 px-32 leading-6" dangerouslySetInnerHTML={{__html: body}}>
                        </AccordionDetails>
                    </StyledAccordion>
                ))}
            </DialogContent>
        </>
    )
}

FAQLayout.defaultProps = {
    heading: 'Các câu hỏi thường gặp'
}


export default FAQLayout