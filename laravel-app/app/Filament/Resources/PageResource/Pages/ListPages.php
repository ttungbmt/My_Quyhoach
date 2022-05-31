<?php

namespace App\Filament\Resources\PageResource\Pages;

use App\Filament\Resources\PageResource;
use App\Models\Post;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;

class ListPages extends ListRecords
{
    protected static string $resource = PageResource::class;

    protected function getTableQuery(): Builder
    {
        return Post::wherePostType('page');
    }
}
