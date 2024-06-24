<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;


class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //$carts = Cart::where('user_id', Auth::id())->get();

        $carts = DB::table('carts')
            ->join('menus', 'carts.menu_id', '=', 'menus.id')
            ->select('menus.*', 'carts.*')
            ->where('carts.user_id', Auth::id())
            ->get();

        //dd($carts);


        return Inertia::render('Cart/Cart',[
            'status' => session('status'),
            'carts' => $carts,
        ]);
    }

    /**
     * Add item to cart
     */
    public function add($id)
    {
        $userId = Auth::id();
        $menuId = $id;

        // Check if the menu item already exists in the cart
        $cartItem = Cart::where('user_id', $userId)
            ->where('menu_id', $menuId)
            ->first();

        if ($cartItem) {
            // Item exists, increment quantity
            $cartItem->increment('quantity');
        } else {
            // Item doesn't exist, create new cart item
            $cart = Cart::create([
                'user_id' => $userId,
                'menu_id' => $menuId,
                'quantity' => 1,
            ]);
        }

        $restaurant_id = Menu::find($id);

        return Redirect::route('restaurant', $restaurant_id->restaurant_id)->with('status', 'added-to-cart');

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
    }

    /**
     * Display the specified resource.
     */
    public function show(Cart $cart)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cart $cart, $id, $value)
    {
        //dd($id, $value);

        $cartItem = Cart::where('user_id', Auth::id())
            ->where('id', $id)
            ->first();

        $cartItem->increment('quantity', $value);

        if($cartItem->quantity <= 0){
            $cartItem->delete();
        }



        //dd($cartItem->quantity);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cart $cart)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart, $id)
    {
        $cart = Cart::find($id);

        //dd($id);

        $cart->delete();
    }
}
