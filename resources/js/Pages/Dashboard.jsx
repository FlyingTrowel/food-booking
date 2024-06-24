import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import RestaurantCard from '@/Components/RestaurantCard';
import {Head, Link} from "@inertiajs/react"; // Import your RestaurantCard component

function Dashboard({ auth, restaurants }) {
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-200 leading-tight">Order Now</h2>}>
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-800 dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="dashboard grid grid-cols-4 gap-4"> {/* Use CSS grid for layout */}
                            {restaurants.map((restaurant) => (
                                <Link key={restaurant.id} href={route('restaurant', restaurant.id)}>
                                    <RestaurantCard restaurant={restaurant} />
                                </Link>
                            ))}
                            {restaurants.length === 0 && <p className="text-gray-200">No restaurants found.</p>}
                        </div>

                        {/* Pagination (replace with your pagination logic) */}
                        <div className="pagination">
                            <button disabled className="opacity-50">Previous</button>
                            <button className="active">1</button>
                            <button>2</button>
                            <button>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Dashboard;
