<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // On s'assure qu'il y a des utilisateurs et des catégories
    $users = User::all();
    $categories = Category::all();

    if ($users->isEmpty() || $categories->isEmpty()) {
        $this->command->info('No users or categories found. Please seed users and categories first.');
        return;
    }

    foreach ($categories as $category) {
        // Création des articles
        $posts = \App\Models\Post::factory(3)->create([
            'user_id' => $users->random()->id,
            'category_id' => $category->id,
        ]);

        // Mise à jour des titres des posts
       
    }
    }
}
