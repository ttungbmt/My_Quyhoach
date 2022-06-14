<?php
namespace App\Models\Concerns;

use Multicaret\Acquaintances\Interaction;

trait CanViewedThuadat
{
    /**
     * Return viewers.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function viewers()
    {
        return $this->morphToMany(Interaction::getUserModelName(), 'subject',
            config('acquaintances.tables.interactions'))
            ->wherePivot('relation', '=', 'thuadat_view')
            ->withPivot(...Interaction::$pivotColumns)
            ->using(Interaction::getInteractionRelationModelName())
            ->withTimestamps();
    }

    public function isViewedBy($user)
    {
        return Interaction::isRelationExists($this, 'viewers', $user);
    }

    public function viewsCount()
    {
        return $this->viewers()->sum('relation_value');
    }

    public function viewsCountReadable($precision = 0, $divisors = null)
    {
        return Interaction::numberToReadable($this->viewsCount(), $precision, $divisors);
    }
}
