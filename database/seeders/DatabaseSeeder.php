<?php

namespace Database\Seeders;

use App\Models\Post;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Category;
use App\Models\Comment;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::truncate();
        Category::truncate();
        Comment::truncate();
        User::factory(5)->create();

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('12345678'),
        ]);
        $this->call([CategorySeeder::class,PostSeeder::class,CommentSeeder::class]);

        $posts = Post::all();
        foreach ($posts as $post) {
            $category= $post->category;
            $post->update(['user_id'=>rand(1,5),'title' => $post->title . "_" . $category->name,"slug"=>str()->slug($post->title . "_" . $category->name)]);
        }
    }
}
