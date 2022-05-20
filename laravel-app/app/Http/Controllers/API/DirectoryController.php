<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\HcPhuong;
use App\Models\HcQuan;
use App\Models\HcTinh;
use Illuminate\Http\Request;

class DirectoryController extends Controller
{
    public function hcTinh(){
        return HcTinh::get(['ten', 'ma'])->sortBy('ten', SORT_NATURAL)->values()->map(fn($v) => ['label' => $v->ten, 'value' => $v->ma]);
    }

    public function hcQuan(Request $request){
        $ma_tp = $request->input('ma_tp');

        return HcQuan::when($ma_tp, fn($query, $ma) => $query->where('ma_tp', $ma))
            ->get(['ten', 'ma'])
            ->sortBy('ten', SORT_NATURAL)->values()
            ->map(fn($v) => ['label' => $v->ten, 'value' => $v->ma]);
    }

    public function hcPhuong(Request $request){
        $ma_qh = $request->input('ma_qh');

        return HcPhuong::when($ma_qh, fn($query, $ma) => $query->where('ma_qh', $ma))
            ->get(['ten', 'ma'])
            ->sortBy('ten', SORT_NATURAL)
            ->values()
            ->map(fn($v) => ['label' => $v->ten, 'value' => $v->ma]);
    }
}
