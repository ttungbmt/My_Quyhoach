import {useMapEvent, GeoJSON, Polygon, useMap} from "react-leaflet";
import {useQuery} from "react-query";
import {useEffect, useRef, useState} from "react";
import axios from 'axios'
import {useUpdateEffect} from "react-use";
import {useNavigate} from "react-router-dom";
import useThuadatStore from "../../../../../app/main/map/SearchThuadat/useThuadatStore";
import mapService from "app/services/mapService/mapService";
import {geomToLatLngs} from "@redux-leaflet";
import L from 'leaflet'
import {getCoord} from "@turf/invariant";



export const getUrlLayer = (latlng, layer) => {
    let map = layer._map,
        point = map.latLngToContainerPoint(latlng, map.getZoom()),
        size = map.getSize(),
        wmsParams = layer.wmsParams,
        params = {
            request: 'GetFeatureInfo',
            service: 'WMS',
            srs: 'EPSG:4326',
            styles: wmsParams.styles,
            transparent: wmsParams.transparent,
            version: wmsParams.version,
            format: wmsParams.format,
            bbox: map.getBounds().toBBoxString(),
            height: size.y,
            width: size.x,
            layers: layer.wmsParams.layers,
            query_layers: layer.wmsParams.layers,
            info_format: 'application/json',
            feature_count: 10
        };

    params[params.version === '1.3.0' ? 'i' : 'x'] = Math.round(point.x);
    params[params.version === '1.3.0' ? 'j' : 'y'] = Math.round(point.y);

    if (wmsParams.cql_filter) params.cql_filter = wmsParams.cql_filter

    return (layer._url || layer._wmsUrl) + L.Util.getParamString(params, layer._url, true)
}

const getThuadatInfo = async ({queryKey: [, url]}) => {
    const data = await axios.get(url).then(res => res.data)
    return data
}

function ThuadatWMS() {
    const polygonRef = useRef()
    const map = useMap()
    // const abortController = useRef()
    // const navigate = useNavigate();
    // const [request, setRequest] = useState(null)
    // const {isLoading, data, dataUpdatedAt} = useQuery(['getThuadatInfo', request?.url], getThuadatInfo, {enabled: !!request})
    // const [geometryId, geometry, setGeometry] = useThuadatStore('geometryId, geometry, setGeometry')
    const [feature, setFeature, getByLocation] = useThuadatStore('feature, setFeature, getByLocation')

    useMapEvent('click', ({latlng}) => {
        getByLocation(latlng)
        // if (abortController.current) abortController.current.abort()
        //
        // abortController.current = new AbortController()
        //
        // mapService.getThuadatByLocation({location: latlng}, {
        //     signal: abortController.current.signal
        // }).then(res => {
        //     setFeature(res)
        // })

        // map.eachLayer(layer => {
        //     if(layer.options.title === 'Thửa đất'){
        //         let url = getUrlLayer(latlng, layer)
        //         axios.get(url).then(res => res.data).then((res) => {
        //             let id = _.get(res, 'features.0.properties.id')
        //
        //             if(id) setRequest({url: `/api/thuadats/view/${id}`, id})
        //             else setRequest(null)
        //
        //         })
        //     }
        // })
    })

    // useUpdateEffect(() => {
    //     if(data?.id) {
    //         navigate(`/maps/thong-tin-thua-dat/${request.id}`, {state: data});
    //         setGeometry(data.geometry)
    //     }
    // }, [data?.id])
    //

    const positions = [
        [
            [
                10.77479536425587,
                106.62969589233397,
            ],
            [
                10.77479536425587,
                106.67364120483398,
            ],
            [
                10.823358297175226,
                106.67364120483398,
            ],
            [
                10.823358297175226,
                106.62969589233397,
            ],
            [
                10.77479536425587,
                106.62969589233397,
            ]
        ]
    ]

    // useEffect(() => {
    //     if(feature) {
    //         console.log(L.version)
    //         let polygon = L.polygon(geomToLatLngs(feature?.geometry)[0], {
    //             showMeasurements: true
    //         })
    //             .addTo(map)
    //             .showMeasurements();
    //     }
    // }, [JSON.stringify(feature)])


    const polygonOptions = {
        showMeasurements: true,
        measurementOptions: {
            // minPixelDistance: 50,
            showOnHover: false,
            showArea: false,
        }
    }


    return feature?.geometry && <Polygon key={feature.id} {...polygonOptions} positions={geomToLatLngs(feature?.geometry)[0]} pathOptions={{color: '#ff008c', fillColor: '#ff008c8c'}} />
    // return null
}

export default ThuadatWMS