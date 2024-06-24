<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //dd("im index");

        //$orders = Order::where('user_id', Auth::id())->get();

        $orders = DB::table('orders')
            ->join('menus', 'orders.menu_id', '=', 'menus.id')
            ->select('menus.*', 'orders.*')
            ->where('orders.user_id', Auth::id())
            ->get();

        //dd($orders);

        return Inertia::render('Order/Order', [
            'status' => session('status'),
            'orders' => $orders,

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $id)
    {
        //dd($id);

        $cart = Cart::find($id);

        $order = Order::create([
            'user_id' => $cart->user_id,
            'menu_id' => $cart->menu_id,
            'quantity' => $cart->quantity,
        ]);

        $cart->delete();
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
