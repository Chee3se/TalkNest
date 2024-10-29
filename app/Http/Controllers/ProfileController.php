<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;


class ProfileController extends Controller
{
    public function show(): Response
    {
        $user = Auth::user();

        // Calculate the total votes and retrieve posts
        $totalVotes = $user->posts()->sum('rating');
        $totalPosts = $user->posts()->count();
        $totalComments = $user->comments()->count();
        $posts = $user->posts()->latest()->get(['id', 'title', 'created_at', 'rating']); // Get posts with basic details
        $comments = $user->comments()->latest()->get(['id', 'content', 'user_id', 'post_id']);

        return Inertia::render('Profile/Index', [
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'totalVotes' => $totalVotes,
                'totalPosts' => $totalPosts,
                'totalComments' => $totalComments,
            ],
            'posts' => $posts,
            'comments' => $comments,
        ]);
    }
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
