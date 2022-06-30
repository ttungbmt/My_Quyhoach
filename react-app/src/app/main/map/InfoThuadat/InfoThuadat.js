import PageSimple from '@base/theme-layouts/map/components/SidePage'
import {Alert, Box, Divider, ListItem, Stack} from '@mui/material'
import {useTitle} from '@base/hooks'
import {useLocation, useNavigate, useParams} from "react-router-dom";
import useThuadatStore from "../SearchThuadat/useThuadatStore";
import List from "@mui/material/List";
import { darken } from '@mui/material/styles';
import {useMount} from "react-use";
import numeral from 'numeral'
import {useEffect, useMemo, useState} from "react";
import pointOnFeature from '@turf/point-on-feature'
import {getCoords} from '@turf/invariant'
import flip from '@turf/flip'
import ActionButton from "./ActionButton";
import {useDispatch} from "react-redux";
import {openDialog} from "app/store/fuse/dialogSlice";
import clsx from "clsx";
import ls from 'localstorage-slim'
import {useQuery} from "react-query";
import axios from 'axios'
import mapService from "app/services/mapService/mapService";
import Button from "@mui/material/Button";

function useViewsCount(id){
    // https://api.ipify.org/?format=json
    const {data: ip} = useQuery('getCurrentIp', () => axios.get(`/api/ip`).then(res => res.data?.ip ?? res.data), {
        refetchOnWindowFocus: false,
        refetchOnMount: false
    })


    useEffect(() => {
        if(!id || !ip) return () => {}

        let viewIPs = ls.get('thudatViewIPs') || {}

        if(!viewIPs[id]) {
            viewIPs[id] = ip
            ls.set('thudatViewIPs', viewIPs, { ttl: 24*30*30 })
            mapService.increaseThudatViewCount(id)
        }
    }, [ip, id])
}

function InfoThuadat({title}) {
    const [like, setLike] = useState(true)
    useTitle(title)

    const dispatch = useDispatch()

    const {id} = useParams();
    const navigate = useNavigate()
    const [loading, feature, getById, toggleFavorite] = useThuadatStore('loading, feature, getById, toggleFavorite')

    useMount(() => {
        if(feature) navigate(`/maps/thong-tin-thua-dat/${feature.id}`)
        else id && getById(id)
    })

    useViewsCount(id)

    const locationStr = useMemo(() => {
        if(feature?.geometry) return getCoords(flip(pointOnFeature(feature?.geometry))).join(',')
        return ``
    }, [feature?.geometry])

    const isExist = true

    return (
        <PageSimple
            title={title}
            loading={loading}
            toolbar={(
                <div className="flex justify-between px-6 py-2">
                    <div className="flex">
                        <Stack spacing={1} direction="row" divider={<Divider orientation="vertical" sx={{height: 30}} className="self-center"/>}>
                            <Stack spacing={0.5} direction="row" alignItems="center">
                                {[
                                    {title: 'Lưu', iconClass: 'fa-duotone fa-box-archive text-blue-500', visible: isExist, onClick: () => dispatch(openDialog({ name: 'save-thuadat', heading: 'Lưu thông tin thửa đất' }))},
                                    {title: 'Chỉnh sửa', iconClass: 'fa-duotone fa-pen-to-square text-green-500', visible: isExist, onClick: () => dispatch(openDialog({ name: 'save-thuadat', heading: 'Cập nhật thông tin thửa đất' }))},
                                    {title: 'Xóa', iconClass: 'fa-duotone fa-trash text-red-500', visible: isExist, onClick: () => dispatch(openDialog({ name: 'delete-confirmation' }))},
                                ].map((i, k) => (
                                    <ActionButton key={k} {...i}/>
                                ))}
                            </Stack>
                            <Stack spacing={0.5} direction="row" alignItems="center">
                                {[
                                    {
                                        title: 'Yêu thích',
                                        iconClass: clsx({'fa-solid': feature?.is_favorited, 'fa-regular': !feature?.is_favorited}, 'fa-heart text-red-500 w-auto'),
                                        visible: isExist, onClick: () => toggleFavorite(feature?.id)
                                    },
                                    // {title: 'Số lượt xem', iconClass: 'fa-duotone fa-eye text-orange-500 w-auto', visible: isExist, className: 'text-orange-500', text: feature?.views_count},
                                ].map((i, k) => (
                                    <ActionButton key={k} {...i}/>
                                ))}
                            </Stack>
                        </Stack>
                    </div>

                    <Stack spacing={0.5} direction="row" alignItems="center">
                        {[
                            {title: 'Xem vị trí', iconClass: 'fa-light fa-location-arrow', visible: !!locationStr, onClick: () => window.open(`https://www.google.com/maps/search/${locationStr}`)},
                            {title: 'Dẫn đường', iconClass: 'fa-light fa-diamond-turn-right', visible: !!locationStr, onClick: () => window.open(`https://www.google.com/maps/dir/?api=1&destination=${locationStr}&travelmode=driving`)},
                            {title: 'Chia sẽ', iconClass: 'fa-light fa-share-nodes', visible: !!locationStr, onClick: () => dispatch(openDialog({ name: 'share' }))},
                        ].map((i, k) => <ActionButton key={k} {...i}/>)}
                    </Stack>
                </div>
            )}
            content={(
                <div className='w-full p-12'>
                    <Alert severity='warning' className="text-base leading-6" icon={false}>
                        <span className="font-semibold">Lưu ý</span>: Thông tin quy hoạch chỉ mang tính tham khảo. Quý khách có nhu cầu <span className="font-semibold">xác minh thửa đất, đo đạc, lập họa đồ</span>  bảng vẽ nội nghiệp, cập nhật số mới bởi cơ quan nhà nước. <br/>Xin vui lòng liên hệ <span className="text-red-500 font-semibold">1900-1700, 028-9999-1700</span> để được tư vấn thêm. Hoặc điền mẫu sau
                    </Alert>

                    <Button variant="outlined" color="primary" className="mt-12" size="medium" fullWidth>Nhập thông tin liên hệ</Button>

                    {feature && (
                        <div className="pl-6">
                            <div className="font-semibold text-lg mt-12"><span className="text-primary">Thông tin thửa đất</span></div>
                            <Divider className="my-6"/>
                            <table>
                                <tbody>
                                <tr>
                                    <td className="py-4 pr-24">Tỉnh/Thành</td>
                                    <td className="font-semibold">{feature.tinh_tp}</td>
                                </tr>
                                <tr>
                                    <td className="py-4 pr-24">Quận/Huyện</td>
                                    <td className="font-semibold">{feature.quanhuyen}</td>
                                </tr>
                                <tr>
                                    <td className="py-4 pr-24">Phường/Xã</td>
                                    <td className="font-semibold">{feature.phuongxa}</td>
                                </tr>
                                <tr>
                                    <td className="py-4 pr-24">Số thửa</td>
                                    <td className="font-semibold">{feature.sothua}</td>
                                </tr>
                                <tr>
                                    <td className="py-4 pr-24">Số tờ</td>
                                    <td className="font-semibold">{feature.soto}</td>
                                </tr>
                                <tr>
                                    <td className="py-4 pr-24">Diện tích lô đất</td>
                                    <td className="font-semibold">{numeral(feature.dientich).format('0,0')} m<sup>2</sup></td>
                                </tr>
                                </tbody>
                            </table>
                            <div className="font-semibold text-lg mt-24"><span className="text-primary">Chức năng sử dụng đất</span></div>
                            <Divider className="my-6"/>
                            <div className="mb-6">Nhấn vào các ô chức năng để xem chi tiết</div>
                            <List>
                                <Stack spacing={1.5}>
                                    {feature.quyhoachs.map((qh, k) => (
                                        <ListItem button key={k} sx={{background: `linear-gradient(0deg,${darken(qh.fill_color, 0.07)},${qh.fill_color})`, color: 'black', '&.MuiListItem-root:hover': {backgroundColor: qh.fill_color}}} disablePadding className="rounded-xl">
                                            <div className="flex text-gray-900">
                                                <div className="min-w-60 flex items-center justify-center text-3xl" style={{backgroundColor: 'hsla(0,0%,100%,.2)'}}>{k+1}</div>
                                                <div className="p-12 leading-7">
                                                    <div className="px-6">{qh.ma_sdd}</div>
                                                    <div className="px-6 font-semibold">{qh.ten_sdd}</div>
                                                    <div className="px-6">{numeral(qh.dientich).format('0,0')} m<sup>2</sup></div>
                                                </div>
                                                {/*<img className="absolute top-0 h-full -right-1" src="https://www.bootstrapdash.com/demo/purple/jquery/template/assets/images/dashboard/circle.svg" alt=""/>*/}
                                            </div>
                                        </ListItem>
                                    ))}
                                </Stack>
                            </List>
                            <div className="font-semibold text-lg mt-12"><span className="text-primary">Tọa độ vệ tinh</span></div>
                            <Divider className="my-6"/>
                            <div className="font-medium">{locationStr.split(',').map(v => _.toNumber(v).toFixed(8)).join(', ')}</div>
                        </div>
                    )}
                </div>
            )}
        />
    )
}

InfoThuadat.defaultProps = {
    title: 'Thông tin quy hoạch'
}

export default InfoThuadat