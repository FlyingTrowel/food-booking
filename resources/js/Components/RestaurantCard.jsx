import React from 'react';

function RestaurantCard({ restaurant, menusWithImage }) {
    return (
        <div className="restaurant-card py-4">
            <img
                src={menusWithImage[restaurant.id] ? `/storage/menus/${menusWithImage[restaurant.id].image}` : `/menus/test.jpg`}
                alt="Restaurant Image"
                className="h-48 w-48 aspect-square rounded-lg sm:rounded-none mr-4 mx-auto object-contain"
            />


            <div className="content text-center text-white">  {/* Added classes */}
                <h3>{restaurant.name}</h3>
                <p className="cuisine">{restaurant.cuisine}</p>
            </div>

        </div>
    );
}

export default RestaurantCard;
