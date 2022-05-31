<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use MStaack\LaravelPostgis\Eloquent\PostgisTrait;

class Thuadat extends Model
{
    use PostgisTrait;

    protected $table = 'thuadat';

    protected $postgisFields = ['geom'];
}
