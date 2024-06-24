import React from 'react';

function RestaurantCard({ restaurant }) {
    return (
        <div className="restaurant-card">
            <img src="{{ asset('placeholder.jpg') }}" alt="Restaurant Image" />
            <div className="content">
                <h3>{restaurant.name}</h3>
                <p className="cuisine">{restaurant.cuisine}</p>
                <span className="rating">
          {Array(restaurant.average_rating)
              .fill(null)
              .map((_, i) => (
                  <span key={i}>&#9733;</span>
              ))}
        </span>
            </div>
        </div>
    );
}

export default RestaurantCard;
