<?php

namespace App\Http\Middleware;

use App\Models\Post;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsPostOwner
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $path = $request->getPathInfo();
        // Get the id for the post from the path which is /posts/{id}/edit
        $post = Post::findOrFail((int) explode('/', $path)[2]);
        // Check if post exists
        if (!$post) {
            abort(404);
        }
        if ($post->user_id !== auth()->id()) {
            abort(403);
        }
        return $next($request);
    }
}
