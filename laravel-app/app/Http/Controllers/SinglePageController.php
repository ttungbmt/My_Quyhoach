<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;

class SinglePageController extends Controller
{
    public function __invoke()
    {
        return File::get('apps/maps/index.html');
    }
}
