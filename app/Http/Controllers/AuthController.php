<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\CategoriesResource;
use App\Http\Resources\PostResources;
use App\Models\Category;
use App\Models\Post;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::query()->all();
        return response(compact("users"));
    }

    public function getCategoriesWithLatestPosts()
    {
        // Récupérer les catégories avec leurs trois derniers posts
        $categories = Category::with(['posts' => function ($query) {
            $query->latest()->limit(1);
        }])->get();
        // $categories = CategoriesResource::collection($categories);
        $latest = $categories->first();
        return response(compact("categories","latest"));
    }


    public function categories()
    {
        $categories = CategoriesResource::collection(Category::all());
        return response(compact("categories"));
    }
    public function posts()
    {
        $categories = PostResources::collection(Post::all());
        return response(compact("posts"));
    }
    public function readPost(Post $post)
    {
        $userpost = $post->user;
        $category = $post->category;
        $related = $category ? $category->posts()->where('id', '<>', $post->id)->latest()->limit(5)->get()
            : collect();
        $comments = $post->comments()->with('user')->get();
        return response(compact('post', 'userpost', 'category', 'comments', 'related'));
    }
    public function showCategorie($c)
    {
        // Récupération d'une seule catégorie par son slug
        $category = Category::where('slug', $c)->with('posts')->first();
        // $category = Category::where('slug', $c)->first();
        // Vérification si la catégorie existe
        if (!$category) {
            return response()->json(['error' => 'Category not found'], 404);
        }

        // Utilisation de la ressource pour la transformation
        $categorieResource = new CategoriesResource($category);

        // Retourne la catégorie dans la réponse
        return response()->json($category, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return [
            'email' => 'required|email', // Enlève la vérification d'existence
            'password' => 'required'
        ];
        return $request->all();
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {

        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }

    public function login(LoginUserRequest $request)
    {
        $credentials = $request->validated();
        // $credentials['password'] = Hash::make($credentials['password']);
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => "Email ou mot de passe incorrecte.",
            ], 422);
        }
        $user = Auth::user();
        $token = $user->createToken(time() * 1000)->plainTextToken;
        return response(compact("user", "token"));
    }
    public function register(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $user = $user = User::create($data);
        if ($user) {
            $token = $user->createToken(time() * 1000)->plainTextToken;
            return response(compact("user", "token"));
        }
        abort(422);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return '';
    }
}
