<?php
namespace App\Models\Concerns;

use Illuminate\Support\Facades\DB;
use Multicaret\Acquaintances\Interaction;

trait CanViewThuadat
{
    public function viewThuadat($targets, int $amount = 0, $class = __CLASS__)
    {
        return Interaction::attachRelations($this, 'thuadatViews', $targets, $class, [
            'relation_value' => $this->hasViewed($targets, $class) ? DB::raw('relation_value + 1') : 1
        ]);
    }

    public function hasViewed($target, $class = __CLASS__)
    {
        return Interaction::isRelationExists($this, 'thuadatViews', $target, $class);
    }

    public function thuadatViews($class = __CLASS__)
    {
        return $this->morphedByMany($class, 'subject',
            config('acquaintances.tables.interactions'))
            ->wherePivot('relation', '=', 'thuadat_view')
            ->withPivot(...Interaction::$pivotColumns)
            ->using(Interaction::getInteractionRelationModelName())
            ->withTimestamps();
    }
}
