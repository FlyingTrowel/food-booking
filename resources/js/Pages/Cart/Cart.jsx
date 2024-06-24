import React, {useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router} from '@inertiajs/react';

export default function Cart({ auth, id, carts }) {
    const handleQuantityUp = (event, cartId) => {
        // Implement logic to update cart item quantity using Inertia
        event.preventDefault();
        console.log(cartId)

        router.patch(route('cart.edit', [cartId, 1]))

    };

    const handleQuantityDown = (event, cartId) => {
        // Implement logic to update cart item quantity using Inertia
        event.preventDefault();

        router.patch(route('cart.edit', [cartId, -1]))

    };

    const handleRemoveItem = (cartId) => {
        console.log(cartId);
        router.delete(route('cart.destroy', cartId));
    };

    const [selected, setSelected] = useState([]);
    const [total, setTotal] = useState(0.0);

    const handleCheckbox = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setSelected([...selected, value]); // add the value to the selected array
        } else {
            setSelected(selected.filter(item => item !== value)); // remove the value from the selected array
        }

    };
    const handleCheckout = (e) => {
        e.preventDefault();
        console.log(selected); // access the selected values from the state

    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Cart</h2>}
        >
            <Head title="Cart" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        {carts.length === 0 ? (
                            <p>Your cart is empty.</p>
                        ) : (
                            <ul className="list-disc space-y-4">
                                {carts.map((cart) => (
                                    <li key={cart.id} className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input type="checkbox" value={cart.id} onChange={handleCheckbox}
                                                   className="mr-4"/>
                                            <img src="{{ asset('placeholder.jpg') }}" alt={cart.name}
                                                 className="w-16 h-16 rounded-lg object-cover"/>
                                            <div className="ml-4">
                                                <h3 className="text-gray-900 dark:text-gray-200 font-bold">{cart.name}</h3>
                                                <p className="text-gray-700 dark:text-gray-400">{cart.description}</p>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-gray-900 dark:text-gray-200 font-bold">{`RM${cart.price}`}</h3>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <button
                                                className="mr-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                onClick={(e) => handleQuantityDown(e, cart.id)}
                                            >
                                                -
                                            </button>
                                            <input type="text"
                                                   className="w-10 text-center border border-gray-300 rounded-lg px-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                   value={cart.quantity}/>
                                            <button
                                                className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                onClick={(e) => handleQuantityUp(e, cart.id)}
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button type="button" onClick={() => handleRemoveItem(cart.id)}
                                                className="text-red-500 hover:text-red-700 font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="ml-4">
                        <h3 className="text-gray-900 dark:text-gray-200 font-bold">RM</h3>
                    </div>

                    {/* Checkout Button */}
                    <div className="flex justify-start mb-4">

                        <button type="button" onClick={handleCheckout}
                                className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                            Checkout
                        </button>
                    </div>
                </div>


            </div>
        </AuthenticatedLayout>
    );
}
