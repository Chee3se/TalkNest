<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\Rate;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rate>
 */
class RateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::inRandomOrder()->first();
        $post = Post::inRandomOrder()->first();

        // Ensure no duplicate entries with the same post_id and user_id
        while (Rate::where('user_id', $user->id)->where('post_id', $post->id)->exists()) {
            $user = User::inRandomOrder()->first();
            $post = Post::inRandomOrder()->first();
        }

        $rate = $this->faker->boolean(80);

        if ($rate) {
            $post->rating += 1;
        } else {
            $post->rating -= 1;
        }

        $post->save();

        return [
            'type' => $rate,
            'user_id' => $user->id,
            'post_id' => $post->id,
        ];
    }
}
