import {DialogContent, DialogTitle} from "@mui/material";

function IntroLayout({heading, closeBtn}){
    return (
        <>
            <DialogTitle className="text-center"><span className="text-primary uppercase font-bold text-3xl">{heading}</span> {closeBtn}</DialogTitle>
            <DialogContent className="leading-8 text-base" sx={{px: {md: 10}, pb: 4}}>
                <p className="pb-16">Ứng dụng "Tra Cứu Quy Hoạch" được phát triển và quản lý bởi Tổng đài địa ốc nhằm cung cấp thông tin quy hoạch đô thị đến người dân, tổ chức và doanh nghiệp một cách trực tuyến thông qua ứng dụng web và ứng dụng trên thiết bị di động thông minh (điện thoại thông minh và máy tính bảng).</p>
                <p className="pb-16">Thông tin quy hoạch được cung cấp trên ứng dụng "Tra Cứu Quy Hoạch" là Quy hoạch sử dụng đất trong hồ sơ quy hoạch phân khu tỷ lệ 1/2000. Người dùng có thể xác định vị trí của khu đất thông qua việc nhập toạ độ của khu đất (các thông số này có thể tìm thấy trong giấy chứng nhận quyền sử dụng đất hoặc bản đồ hiện trạng vị trí khu đất), hoặc xác định vị trí khu đất thông qua định vị GPS có sẵn trong thiết bị di động thông minh. Ngoài ra, người dùng còn có thể tải về các bản đồ quy hoạch và quyết định phê duyệt quy hoạch để có thể tham khảo một cách cụ thể hơn. Nội dung thông tin quy hoạch cung cấp thông qua các ứng dụng là các hồ sơ quy hoạch đã được cơ quan có thẩm quyền phê duyệt và có đầy đủ căn cứ pháp lý cho người dân để tham khảo và áp dụng.</p>
                <p className="pb-16">Ngoài ra, ứng dụng "Tra Cứu Quy Hoạch " cung cấp chức năng bản đồ số. Đây là chức năng cung cấp bản đồ quy hoạch phân khu được xây dựng trên nền tảng công nghệ Hệ thống Thông tin Địa lý (GIS), cho phép người dùng định vị thửa đất thông qua một chức năng nữa là tìm kiếm theo số tờ-số thửa bên cạnh việc tìm kiếm thông qua toạ độ khu đất hoặc định vị GPS.</p>
                <p className="pb-16">Ứng dụng Tra Cứu Quy Hoạch còn có chứng năng đo vẽ ngay trên bản đồ số, là công cụ giúp người giùm phát thảo sơ bộ cho mục đích phân lô – tách thửa. Chức năng chuyển đổi hệ tọa độ vệ tinh Ws84 ( Google map) sang hệ tọa độ VN2000 giúp người dùng xác định được vị trí của Nhà hoặc Đất.</p>
                <div className="flex justify-center mt-20"><img src="https://tongdaidiaoc.com.vn/_nuxt/img/logo_tddo_dark.60c70e4.png" alt="None" className="w-320"/></div>
            </DialogContent>
        </>
    )
}

IntroLayout.defaultProps = {
    heading: 'Giới thiệu phần mềm'
}

export default IntroLayout