<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Post::factory()->create([
            'title' => 'First Post',
            'content' => 'This is the first post.',
            'category_id' => 1,
            'user_id' => 1,
        ]);

        Post::factory()->create([
            'title' => 'Second Post',
            'content' => 'This is the second post.',
            'category_id' => 2,
            'user_id' => 1,
        ]);
    }
}
