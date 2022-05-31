<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function view(Request $request, $slug){
        return Post::where('slug', $slug)->first();
    }
}
