<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loaidat extends Model
{
    protected $table = 'loaidat';

    protected $fillable = ['ten', 'ma', 'fill_color'];

    public $timestamps = false;
}
