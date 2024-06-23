import { useRef, useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, router } from '@inertiajs/react';

export default function CreateUserRestaurant({ className = '' }) {
    const [showingRestaurantModal, setShowingRestaurantModal] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        restaurantName: '',
        location: '',
        cuisine: '',
    });

    const showRestaurantModal = () => {
        setShowingRestaurantModal(true);
    };

    const registerRestaurant = (e) => {
        e.preventDefault();

        post(route('restaurant.create'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => {
                router.visit(route('restaurant.index'));
            },
        });
    };

    const closeModal = () => {
        setShowingRestaurantModal(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Create Restaurant</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Click the "Create Restaurant" button and fill in the form with your restaurant's information. This includes details
                    such as your restaurant's name, location, cuisine type, and operating hours. Your restaurant can then be managed through
                    this account. Thank you for joining our community!
                </p>
            </header>

            <PrimaryButton onClick={showRestaurantModal}>Create Restaurant</PrimaryButton>

            <Modal show={showingRestaurantModal} onClose={closeModal}>
                <form onSubmit={registerRestaurant} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Register Your Restaurant
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Please fill in the details below to register your restaurant on our platform.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="restaurantName" value="Restaurant Name" className="sr-only" />
                        <TextInput
                            id="restaurantName"
                            type="text"
                            name="restaurantName"
                            value={data.restaurantName}
                            onChange={(e) => setData('restaurantName', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Restaurant Name"
                        />
                        <InputError message={errors.restaurantName} className="mt-2" />

                        <InputLabel htmlFor="location" value="Location" className="sr-only" />
                        <TextInput
                            id="location"
                            type="text"
                            name="location"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            className="mt-1 block w-3/4"
                            placeholder="Location"
                        />
                        <InputError message={errors.location} className="mt-2" />

                        <InputLabel htmlFor="cuisine" value="Cuisine" className="sr-only" />
                        <TextInput
                            id="cuisine"
                            type="text"
                            name="cuisine"
                            value={data.cuisine}
                            onChange={(e) => setData('cuisine', e.target.value)}
                            className="mt-1 block w-3/4"
                            placeholder="Type of Cuisine"
                        />
                        <InputError message={errors.cuisine} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <PrimaryButton className="ms-3" disabled={processing}>
                            Register Restaurant
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

        </section>
    );
}
