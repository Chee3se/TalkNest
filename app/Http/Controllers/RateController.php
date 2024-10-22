<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Rate;
use Illuminate\Http\Request;

class RateController extends Controller
{
    public function rate(Request $request, $postId)
    {
        $request->validate([
            'type' => 'required|boolean',
        ]);

        $post = Post::findOrFail($postId);
        $userId = auth()->id();
        $rateType = $request->type;

        $existingRate = Rate::where('user_id', $userId)
            ->where('post_id', $postId)
            ->first();

        if ($existingRate) {
            if ($existingRate->type == $rateType) {
                $existingRate->delete();
                $post->rating += $rateType ? -1 : 1;
                $message = 'Rating removed successfully.';
            } else {
                $existingRate->update([
                    'type' => $rateType,
                ]);
                $post->rating += $rateType ? 2 : -2;
                $message = 'Rating updated successfully.';
            }
        } else {
            Rate::create([
                'user_id' => $userId,
                'post_id' => $postId,
                'type' => $rateType,
            ]);
            $post->rating += $rateType ? 1 : -1;
            $message = 'Rating submitted successfully.';
        }

        $post->save();

        return response()->json(['message' => $message]);
    }
}
