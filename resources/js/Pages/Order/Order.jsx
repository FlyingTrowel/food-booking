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
                            <p className="text-center text-gray-500 dark:text-gray-300">Your order is empty.</p>
                        ) : (
                            <ul className="list-disc space-y-4">
                                {orders.map((order) => (
                                    <li key={order.id} className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <img src={order.image ? `/storage/menus/${order.image}` : `/menus/test.jpg`}
                                                 alt="Restaurant Image"
                                                 className="h-48 w-48 aspect-square rounded-lg sm:rounded-none mr-4 mx-auto object-contain"/>
                                            <div className="flex flex-col">
                                                <h3 className="text-gray-900 dark:text-gray-200 font-bold">{order.name}</h3>
                                                <p className="text-gray-700 dark:text-gray-400">{order.description}</p>
                                            </div>
                                            <div
                                                className="ml-4 text-gray-900 dark:text-gray-200 font-bold">RM{order.price}</div>
                                        </div>
                                        <div className="flex items-center">  {/* Group quantity and status */}
                                            <input type="text"
                                                   className="w-10 text-center border border-gray-300 rounded-lg px-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                   value={order.quantity}/>
                                            <span
                                                className="ml-4 text-gray-500 dark:text-gray-300">  {/* Assuming there's order status */}
                                                {order.status}
                </span>
                                        </div>
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
