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
                'image' => 'https://static.wixstatic.com/media/d15f39_d01b685c0e274c44a1c54f7f3c8c1cd7~mv2.png', // Vous pouvez ajouter des images si disponibles
                'description' => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos doloribus quos aliquid magni, recusandae maiores ipsum quasi, labore sed voluptate ea error dolorum facilis quas aspernatur beatae dolor id quidem aliquam suscipit? Fugiat est numquam autem provident! Ea, itaque quisquam commodi omnis illum voluptatem quae non vitae doloribus sapiente explicabo perferendis dicta enim quaerat culpa eligendi aspernatur veritatis animi expedita magni molestiae, assumenda minima modi. Vero veritatis quibusdam autem! Vel quidem reiciendis neque optio unde ut perferendis dolores sed recusandae? Officiis dignissimos nam ipsam ad, itaque corrupti omnis iste quas facilis ab, explicabo consequuntur dicta officia at eos? Facilis, dolorum.", // Vous pouvez ajouter des descriptions si disponibles
                'user_id' => $user->id
            ]);
        }
    }
}
