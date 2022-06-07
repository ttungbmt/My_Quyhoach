<?php

namespace App\Models;

use App\Models\Concerns\CanViewedThuadat;
use CyrildeWit\EloquentViewable\Contracts\Viewable;
use CyrildeWit\EloquentViewable\InteractsWithViews;
use Illuminate\Database\Eloquent\Model;
use MStaack\LaravelPostgis\Eloquent\PostgisTrait;
use Multicaret\Acquaintances\Traits\CanBeFavorited;

class Thuadat extends Model implements Viewable
{
    use PostgisTrait;
    use InteractsWithViews;
    use CanBeFavorited, CanViewedThuadat;

    protected $table = 'thuadat';

    protected $postgisFields = ['geom'];

    protected $removeViewsOnDelete = true;
}
