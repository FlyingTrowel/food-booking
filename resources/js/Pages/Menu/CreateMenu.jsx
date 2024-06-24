import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function CreateMenu({ auth, errors, id }) {
    const form = useForm({
        name: '',
        description: '',
        price: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        form.post(route('menu.store', id)); // Assuming route for creating menus
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Create Menu Item</h2>}
        >
            <Head title="Create Menu" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={form.data.name}
                                    onChange={(event) => form.setData('name', event.target.value)}
                                />
                                {errors.name && <div className="text-red-500 text-xs italic">{errors.errors.name}</div>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={form.data.description}
                                    onChange={(event) => form.setData('description', event.target.value)}
                                />
                                {errors.description && <div className="text-red-500 text-xs italic">{errors.errors.description}</div>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    step="0.01" // Optional: Allow decimal pricing
                                    className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={form.data.price}
                                    onChange={(event) => form.setData('price', event.target.value)}
                                />
                                {errors.price && <div className="text-red-500 text-xs italic">{errors.errors.price}</div>}
                            </div>

                            <button type="submit" className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                                Create Menu Item
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
