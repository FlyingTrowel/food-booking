<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Inertia;


class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $menus = Menu::where('restaurant_id', $id)->get();

        return Inertia::render('Menu/Menu', [
            'menuItems' => $menus,
            'status' => session('status'),
            'id' => $id,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($id)
    {
        return Inertia::render('Menu/CreateMenu', [
            'status' => session('status'),
            'id' => $id,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $id)
    {
        //dd($request);
        $validatedData = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Image validation rules
        ]);

        // Handle image upload
        $imageName = null;
        if ($request->hasFile('image')) {
            $imageName = time() . '.' . $request->image->getClientOriginalExtension();
            $request->image->storeAs('public/menus', $imageName); // Store in public/menus
        }

        //dd($imageName);

        $menu = Menu::create([
            'restaurant_id' => $id,
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
            'price' => $validatedData['price'],
            'image' => $imageName, // Store filename
        ]);

        return redirect(route('menu.index', $id));



    }

    /**
     * Display the specified resource.
     */
    public function show(Menu $menu)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Menu $menu, $id)
    {
        $menu = Menu::find($id);
        //dd($menu);

        return Inertia::render('Menu/MenuEdit', [
            'menu' => $menu,
            'status' => session('status'),
            'id' => $id,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Menu $menu, $id)
    {
        //dd($id);
        $validated = $request->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required',
        ]);

        //dd($validated['price']);

        $menu = Menu::find($id);

        $menu->name = $validated['name'];
        $menu->description = $validated['description'];
        $menu->price = $validated['price'];

        //dd($menu->restaurant_id);

        $menu->save();

        return redirect(route('menu.index', $menu->restaurant_id));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Menu $menu, $id)
    {
        //dd("destroy");

        $menu = Menu::find($id);

        $menu->delete();
    }
}
