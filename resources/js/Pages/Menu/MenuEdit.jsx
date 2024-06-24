import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from '@inertiajs/react';

export default function MenuEdit({ auth, menu}) {

    const { data, setData, post, processing, errors } = useForm({
        name: menu.name,
        description: menu.description,
        price: menu.price,
    });
    //console.log(menu);

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(restaurant[0].id);
        post(route('menu.update', menu.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Menu</h2>}
        >
            <Head title="Menu" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <form onSubmit={handleSubmit}>
                            {/* Name Input */}
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
                                <input type="text" id="name" name="name" value={data.name}
                                       onChange={e => setData('name', e.target.value)}
                                       className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-600"/>
                                {errors.name && <div className="text-red-500 text-xs">{errors.name}</div>}
                            </div>

                            {/* Description Input */}
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                />
                                {errors.description && <div className="text-red-500 text-xs">{errors.description}</div>}
                            </div>

                            {/* Price Input */}
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
                                    value={data.price}
                                    onChange={e => setData('price', e.target.value)}
                                />
                                {errors.price && <div className="text-red-500 text-xs">{errors.price}</div>}
                            </div>

                            <button type="submit"
                                    className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                                    disabled={processing}>
                                {processing ? 'Saving...' : 'Save'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
