<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Loaidat;

class LegendController extends Controller
{
    public function index(){
        $model = Loaidat::all();
        return [
            'description' => 'Phân loại chức năng sử dụng đất dựa theo quy định trong Phụ lục của Thông tư số 27/2018/TT-BTNMT ngày 14/12/2018 của Bộ Tài nguyên Môi trường',
            'items' => $model->map(function ($i){
                return [
                    'text' => "{$i['ten']} ({$i['ma']})",
                    'fill_color' => $i['fill_color'],
                ];
            })
        ];
    }
}
