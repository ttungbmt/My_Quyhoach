<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

class MapController extends Controller
{
    public function builder()
    {
        return [
            'app' => [
                'site_name' => env('APP_NAME'),
                'site_icon' => config('filament.favicon'),
            ],
            'layout' => [
                'side_panel' => [
                    'menu' => ['intro', 'doc', 'faq', 'feedback']
                ]
            ],
            'map' => [
                'config' => [
                    'basemap_id' => 'google-maps',
                    'bounds' => [
                        [11.506159782409668, 108.35585021972656],
                        [11.615937232971191, 108.42864227294922],
                    ]
                ],
                'base_layers' => ['mapbox', 'osm', 'google-maps', 'google-satellite', 'google-satellite-hybrid'],
                'overlay_layers' => [
//                ['selected' => true, 'type' => 'wmts', 'layers' => 'tddo:pg_tinh_tp', 'title' => 'Ranh tỉnh/tp', 'url' => '/geoserver/wms', 'isOpacity' => true, 'zIndex' => 120],
//                ['selected' => false, 'type' => 'wmts', 'layers' => 'tddo:pg_quyanhuyen', 'title' => 'Ranh quận huyện', 'url' => '/geoserver/wms', 'isOpacity' => true, 'zIndex' => 125],
                    ['selected' => false, 'type' => 'wmts', 'layers' => 'tddo:pg_phuongxa', 'title' => 'Ranh phường xã', 'url' => '/geoserver/wms', 'isOpacity' => true, 'zIndex' => 130],
                    ['selected' => true, 'type' => 'wmts', 'layers' => 'tddo:v_quyhoach', 'title' => 'Quy hoạch SDĐ', 'url' => '/geoserver/wms', 'isOpacity' => true, 'zIndex' => 90],
                    ['selected' => true, 'type' => 'wmts', 'layers' => 'tddo:v_thuadat', 'title' => 'Thửa đất', 'url' => '/geoserver/wms', 'isOpacity' => true, 'zIndex' => 100],
                ]
            ]
        ];
    }
}
