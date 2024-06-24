import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router} from '@inertiajs/react';

export default function Menu({ auth, mustVerifyEmail, menuItems, id}) {

    const handleEdit = (id) => {
        // Handle edit action, for example, navigate to the edit page
        router.get(route('menu.edit', id));
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this restaurant?')) {
            // Use Inertia's `post` method to send a DELETE request
            router.delete(route('menu.destroy', id));

            // Assuming restaurants data is passed as a prop from the parent component
            // Update the restaurants state on successful deletion (handled by the backend)
            // This will trigger a server-side render and update the table automatically
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Menu</h2>}
        >
            <Head title="Menu" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="flex justify-start mb-4">
                        <Link href={route('menu.create', id)} className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                            Add Menu Item
                        </Link>
                    </div>
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {/* Assuming menuItems is an array of objects with properties like id, name, price */}
                            {menuItems.map((menuItem, index) => (
                                <tr key={menuItem.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                                        {menuItem.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                                        {menuItem.price} {/* Assuming price is a string or number */}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                                        <button

                                            onClick={() => handleEdit(menuItem.id)}
                                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(menuItem.id)}
                                            className="ml-4 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
