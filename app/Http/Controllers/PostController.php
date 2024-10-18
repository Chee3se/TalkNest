<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $post = Post::all();
        return Inertia::render('Post/Index', ["posts" => $post]);
    }
    public function show($id)
    {
        $post = Post::all();
        return Inertia::render('Post/Show', compact('post'));
    }
    public function create()
    {
        return "create";
    }
    public function store()
    {
        return "store";
    }
    public function edit()
    {
        return "edit";
    }
    public function update()
    {
        return "update";
    }
    public function destroy()
    {
        return "destroy";
    }
}
