<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;//
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class FavoriteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response 
    {
        $user = Auth::user();
        $favorites = Favorite::where('user_id', $user->id)->get();
        return Inertia::render('Favorite/Index', [
            //
            'favorites' => $favorites,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $user = Auth::user();

        Favorite::create([
            'user_id' => $user->id,
            'pokemon_id' => $request->pokemon_id,
        ]);

        return response()->json(['message' => 'お気に入りに追加されました'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Favorite $favorite)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Favorite $favorite)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Favorite $favorite)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $user = Auth::user();
        Favorite::where('user_id', $user->id)
                ->where('pokemon_id', $request->pokemon_id)
                ->delete();

        return response()->json(['message' => 'お気に入りから削除されました'], 200);
    }

    public function check(Request $request)
    {
        $user = Auth::user();
        $isFavorite = Favorite::where('user_id', $user->id)
                          ->where('pokemon_id', $request->pokemon_id)
                          ->exists();

        return response()->json(['isFavorite' => $isFavorite], 200);
    }

    public function count(Request $request)
    {
        $user = $request->user();
        $favoriteCount = $user->favorites()->count();
        return response()->json(['count' => $favoriteCount]);
    }

    public function rank(): Response 
    {
        return Inertia::render('Rank', [
            //
            'favorites' => Favorite::all(),
        ]);
    }

    public function clear(): RedirectResponse
    {
        $user = Auth::user();
        Favorite::where('user_id', $user->id)->delete();
        return redirect()->route('favorites.index');
                              
    }



}
