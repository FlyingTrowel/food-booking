<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Collection;


class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $restaurants = Restaurant::where('user_id', Auth::id())->get();

        return Inertia::render('Restaurant/RestaurantHome', [
            'restaurants' => $restaurants,
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {

        // Validate incoming request data
        $validatedData = $request->validate([
            'restaurantName' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'cuisine' => 'required|string|max:255',
        ]);

        $restaurant = Restaurant::create([
            'user_id' => Auth::user()->id,
            'name' => $validatedData['restaurantName'],
            'location' => $validatedData['location'],
            'cuisine' => $validatedData['cuisine'],
            // Add more fields as needed
        ]);

        // Redirect to /restaurant with success message
        return back();

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

    }

    /**
     * Display the specified resource.
     */
    public function show(Restaurant $restaurant)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Restaurant $restaurant, $id)
    {
        //dd($id);

        $restaurant = Restaurant::where('id', $id)->get();

        //dd($restaurant);

        return Inertia::render('Restaurant/RestaurantEdit', [
            'restaurant' => $restaurant,
            'status' => session('status'),
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Restaurant $restaurant, $id)
    {
        //dd($id);

        $validated = $request->validate([
            'name' => 'required',
            'location' => 'required',
            'cuisine' => 'required',
        ]);

        $restaurant = Restaurant::find($id);

        //dd($validated['name']);

        $restaurant->name = $validated['name'];
        $restaurant->location = $validated['location'];
        $restaurant->cuisine = $validated['cuisine'];

        $restaurant->save();

        return redirect(route('restaurant.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Restaurant $restaurant, $id)
    {
        //dd("delete");

        $deleteMenus = Menu::where('restaurant_id', $id)->delete();
        //$menus = Re

        //dd($restaurant);

        $restaurant = Restaurant::find($id);

        $restaurant->delete();



    }
}
