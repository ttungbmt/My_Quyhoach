<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Thuadat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ThuadatController extends Controller
{
    public function view($id){
        $model = Thuadat::findOrFail($id);



        return $this->formatThuadat($model);
    }

    protected function formatThuadat($model){
        $quyhoachs = DB::select(<<<SQL
            SELECT masdd ma_sdd, ld.ten ten_sdd, SUM(ST_Area(its_geom::geography)) dientich
            FROM (
                    SELECT masdd, ST_Intersection(geom, (SELECT geom FROM thuadat WHERE id = {$model->id})) its_geom
                    FROM quyhoach
                    WHERE ST_Intersects(geom, (SELECT geom FROM thuadat WHERE id = {$model->id}))
            ) as qh
            LEFT JOIN loaidat ld ON ld.ma = qh.masdd
            GROUP BY masdd, ld.ten
            HAVING SUM(ST_Area(its_geom::geography)) > 1
            ORDER BY SUM(ST_Area(its_geom::geography))
        SQL);

        return [
            'id' => $model->id,
            'tinh_tp' => 'Lâm Đồng',
            'quanhuyen' => 'Đức Trọng',
            'phuongxa' => 'Đà Loan',
            'sothua' => $model->shthua,
            'soto' => $model->shbando,
            'dientich' => $model->dientich,
            'geometry' => $model->geom,
            'quyhoachs' => $quyhoachs
        ];
    }

    public function getByInfo(Request $request){
        $model = Thuadat::where('shbando', $request->input('soto'))
            ->where('shthua', $request->input('sothua'))
            ->first();

        return $this->formatThuadat($model);
    }

    public function getByLocation(Request $request){
        $location = $request->input('location');
        $model = Thuadat::whereRaw("ST_Intersects('SRID=4326;POINT({$location['lat']} {$location['lng']})', geom)")->get();
        if($model) return $this->formatThuadat($model);
        return null;
    }

    public function getByCoords(Request $request){
        $coords = $request->input('toados');
        $model = new Thuadat;

        foreach ($coords as $coord){
            $model = $model->whereRaw("ST_Intersects(ST_Transform(ST_GeomFromText('POINT({$coord['y']} {$coord['x']})', 3405), 4326), geom)");
        }

        return $this->formatThuadat($model->first());
    }
}
