<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Post extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'post_type',
        'content',
        'user_id',
        'parent_id',
        'featured_image',
        'published_at',
        'sticky_until',
        'password',
        'ordering',
        'status',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'sticky_until' => 'datetime',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function author()
    {
        return $this->belongsTo(config('auth.providers.users.model'), 'user_id', 'id');
    }

    public function parent()
    {
        return $this->belongsTo(self::class, 'parent_id', 'id');
    }

}
