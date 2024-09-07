<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Faker\Factory as Faker;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Comment::truncate();

       
        \App\Models\Post::all()->each(function ($post) {
            Comment::factory()->count(rand(1, 5))->create([
                'post_id' => $post->id
            ]);
        });
    }
}
