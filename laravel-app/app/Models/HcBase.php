<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use MStaack\LaravelPostgis\Eloquent\PostgisTrait;
use Rennokki\QueryCache\Traits\QueryCacheable;

class HcBase extends Model
{
    use QueryCacheable, PostgisTrait;

    public $timestamps = false;

    public $cacheFor = 3600*24*30;

    protected static $flushCacheOnUpdate = true;

    protected $postgisFields = [
        'geom',
    ];

    public static function getDirCap(){
        return array_combine($dir = static::cacheFor(now()->addDays(30))->distinct('cap')->orderBy('cap')->whereNotNull('cap')->get()->pluck('cap')->toArray(), $dir);
    }
}
