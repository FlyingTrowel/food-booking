<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\Order;
use App\Models\Restaurant;
use App\Models\User;
use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class MobileController extends Controller
{
    //register api
    public function register(Request $request)
    {
        //$a = $request->input('name');

        /**
         * {
         * "username": "mobile",
         * "email": "mobile@mobile.com",
         * "password": "12345678"
         * }
         */

        $name = $request->input('name');
        $email = $request->input('email');
        $password = Hash::make($request->input('password')); // Hash password for security


        DB::table('users')->insert([
            'name' => $name,
            'email' => $email,
            'password' => $password,
        ]);

        return response()->json([
            'message' => 'User created!',
        ], 201);
    }

    //login api
    public function login(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');

        // Find user by email
        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json(['message' => 'Invalid email or password'], 401);
        }

        // Compare hashed password
        if (!Hash::check($password, $user->password)) {
            return response()->json(['message' => 'Invalid email or password'], 401);
        }

        // Authentication successful (replace with token generation or session)
        return response()->json([
            'message' => 'Login successful!',
            'user' => $user // Optionally return basic user info
        ], 200);
    }

    public function restaurants(){
        $restaurants = Restaurant::all();

        return response()->json([
            'body' => $restaurants,
        ], 200);
    }

    public function menus($id){
        $menus = Menu::where('restaurant_id', $id)->get();

        return response()->json([
            'body' => $menus,
        ], 200);
    }

    public function addCart($menu_id, $user_id){
        if (isset($menu_id) && !empty($menu_id) && isset($user_id) && !empty($user_id)) {
            // Your logic here (e.g., add to cart)
            $userId = $user_id;
            $menuId = $menu_id;

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

            return response()->json(['message' => 'Success'], 200);
        } else {
            return response()->json(['message' => 'Invalid input'], 400);
        }

        return response()->json([
            'menu' => $menu_id,
            'user' => $user_id,
        ], 200);
    }

    public function carts($id){
        //$carts = Cart::where('user_id', $id)->get();

        $carts = DB::table('carts')
            ->join('menus', 'carts.menu_id', '=', 'menus.id')
            ->select('menus.*', 'carts.*')
            ->where('carts.user_id', $id)
            ->get();

        return response()->json([
            'body' => $carts,
        ], 200);
    }

    public function checkout($id)
    {
        $carts = Cart::where('user_id', $id)->get();

        $orders = [];
        foreach ($carts as $cart) {
            // Create a new order for each cart item
            $order = Order::create([
                'user_id' => $cart->user_id,
                'menu_id' => $cart->menu_id,
                'quantity' => $cart->quantity,
            ]);
            $orders[] = $order; // Add order to an array

            // Delete the cart item after creating the order
            $cart->delete();
        }

        return response()->json([
            'message' => 'Checkout successful!',
            'orders' => $orders, // Return created orders
        ], 200);
    }

    public function orders($id){
        //$carts = Cart::where('user_id', $id)->get();

        $orders = DB::table('orders')
            ->join('menus', 'orders.menu_id', '=', 'menus.id')
            ->select('menus.*', 'orders.*')
            ->where('orders.user_id', $id)
            ->get();

        return response()->json([
            'body' => $orders,
        ], 200);
    }

    public function hasRestaurant($id)
    {
        $exists = Restaurant::where('user_id', $id)->exists();

        // Alternative using count
        // $count = Restaurant::where('user_id', $id)->count();
        // $exists = $count > 0;
        //dd($exists);

        return response()->json([
            'hasRestaurant' => $exists,
        ]);
    }


}
