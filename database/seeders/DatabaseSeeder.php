<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\Rate;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        Post::factory()->create([
            'title' => 'My name is Jeff',
            'content' => 'yes, it indeed is...',
            'user_id' => 1
        ]);

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('root'),
            'role' => 'admin',
        ]);

        User::factory(20)->create();
        Post::factory(10)->create();
        Rate::factory(200)->create();
    }
}
