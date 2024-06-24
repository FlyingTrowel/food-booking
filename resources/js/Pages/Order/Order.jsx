import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Order({ auth, orders}) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Order History</h2>}
        >
            <Head title="Order History" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        {orders.length === 0 ? (
                            <p>Your order is empty.</p>
                        ) : (
                            <ul className="list-disc space-y-4">
                                {orders.map((order) => (
                                    <li key={order.id} className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <img src="{{ asset('placeholder.jpg') }}" alt={order.name}
                                                 className="w-16 h-16 rounded-lg object-cover"/>
                                            <div className="ml-4">
                                                <h3 className="text-gray-900 dark:text-gray-200 font-bold">{order.name}</h3>
                                                <p className="text-gray-700 dark:text-gray-400">{order.description}</p>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-gray-900 dark:text-gray-200 font-bold">{`RM${order.price}`}</h3>
                                            </div>
                                        </div>
                                            <input type="text"
                                                   className="w-10 text-center border border-gray-300 rounded-lg px-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                   value={order.quantity}/>

                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
