import React from 'react';
import { Link } from '@inertiajs/react';

function MenuItemCard({ menuItem }) {
    return (
        <div className="rounded-lg shadow-sm bg-white dark:bg-gray-800">
            <Link href={'/' /**route('cart.add', menuItem.id)*/}>
                <img src="{{ asset('placeholder.jpg') }}" alt={menuItem.name} className="w-full h-40 object-cover rounded-t-lg" />
            </Link>
            <div className="p-4">
                <h5 className="text-gray-900 dark:text-gray-200 font-bold">{menuItem.name}</h5>
                {/**<p className="text-gray-700 dark:text-gray-400">{menuItem.description}</p>*/}
            </div>
            <div className="px-4 pb-2 flex items-center justify-between">
                <span className="text-gray-900 dark:text-gray-200 font-bold">RM{menuItem.price}</span>
                <Link href={route('cart.add', menuItem.id)} className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                    Add to Cart
                </Link>
            </div>
        </div>
    );
}

export default MenuItemCard;
