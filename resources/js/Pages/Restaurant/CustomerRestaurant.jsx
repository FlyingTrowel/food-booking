import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import MenuItemCard from '@/Components/MenuItemCard';// Import your MenuItemCard component
import {Head, Link} from '@inertiajs/react';

function CustomerRestaurant({ auth, restaurant, menus }) {
    console.log(menus)
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Menu</h2>}>
            <Head title="Menu" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg flex items-center">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{restaurant.name}</h2>  {/* Added restaurant name */}
                    </div>


                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <div className="grid grid-cols-4 gap-4"> {/* Use Tailwind CSS grid for layout */}
                            {menus.map((menuItem) => (
                                <MenuItemCard key={menuItem.id} menuItem={menuItem} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default CustomerRestaurant;
