import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function RestaurantHome({ auth, status, restaurant }) {

    const { data, setData, post, processing, errors } = useForm({
        name: restaurant[0].name,
        location: restaurant[0].location,
        cuisine: restaurant[0].cuisine,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(restaurant[0].id);
        post(route('restaurant.update', restaurant[0].id));
    };

    //console.log(restaurant);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Restaurant</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <form onSubmit={handleSubmit}>
                            {/* Name Input */}
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
                                <input type="text" id="name" name="name" value={data.name}
                                       onChange={e => setData('name', e.target.value)}
                                       className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-600" />
                                {errors.name && <div className="text-red-500 text-xs">{errors.name}</div>}
                            </div>

                            {/* Location Input */}
                            <div className="mb-4">
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Location</label>
                                <input type="text" id="location" name="location" value={data.location}
                                       onChange={e => setData('location', e.target.value)}
                                       className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-600" />
                                {errors.location && <div className="text-red-500 text-xs">{errors.location}</div>}
                            </div>

                            {/* Cuisine Input */}
                            <div className="mb-4">
                                <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Cuisine</label>
                                <input type="text" id="cuisine" name="cuisine" value={data.cuisine}
                                       onChange={e => setData('cuisine', e.target.value)}
                                       className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-600" />
                                {errors.cuisine && <div className="text-red-500 text-xs">{errors.cuisine}</div>}
                            </div>

                            <button type="submit" className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600" disabled={processing}>
                                {processing ? 'Saving...' : 'Save'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
