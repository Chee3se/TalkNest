<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class CommentController extends Controller
{
    // In App\Http\Controllers\CommentController.php
    public function store(Request $request, $postId)
    {
        $request->validate([
            'content' => 'required|string',
        ]);

        $request->user()->comments()->create([
            'content' => $request->content,
            'post_id' => $postId,
        ]);

        return redirect()->back()->with('success', 'Comment added successfully.');
    }
}
