<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::truncate();
        $user = User::first(); // On suppose qu'il y a déjà un utilisateur

        if (!$user) {
            $user = User::factory()->create(); // Crée un utilisateur si aucun n'existe
        }

        // Tableau de catégories fictives
        $categories = [
            ['name' => 'World', 'slug' => Str::slug('World')],
            ['name' => 'U.S.', 'slug' => Str::slug('U.S.')], 
            ['name' => 'Technology', 'slug' => Str::slug('Technology')],
            ['name' => 'Design', 'slug' => Str::slug('Design')],
            ['name' => 'Culture', 'slug' => Str::slug('Culture')],
            ['name' => 'Business', 'slug' => Str::slug('Business')],
            ['name' => 'Politics', 'slug' => Str::slug('Politics')],
            ['name' => 'Opinion', 'slug' => Str::slug('Opinion')],
            ['name' => 'Science', 'slug' => Str::slug('Science')],
            ['name' => 'Health', 'slug' => Str::slug('Health')],
            ['name' => 'Style', 'slug' => Str::slug('Style')],
            ['name' => 'Travel', 'slug' => Str::slug('Travel')],
        ];

        // Boucle pour insérer les catégories dans la base de données
        foreach ($categories as $category) {
            Category::create([
                'name' => $category['name'],
                'slug' => $category['slug'],
                'image' => null, // Vous pouvez ajouter des images si disponibles
                'description' => null, // Vous pouvez ajouter des descriptions si disponibles
                'user_id' => $user->id
            ]);
        }
    }
}
