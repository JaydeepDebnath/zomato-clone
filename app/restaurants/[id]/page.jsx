"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import "./RestaurantPage.scss"; 

const RestaurantPage = () => {
  const { id } = useParams(); 
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/restaurants/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRestaurant(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch restaurant:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading restaurant details...</p>;
  if (!restaurant) return <p>Restaurant not found.</p>;

  return (
    <div className="restaurantPage">
      <div className="restaurantHeader">
        <Image
          src={restaurant.image || "/assets/images/default.png"}
          alt={restaurant.name}
          width={600}
          height={400}
          className="restaurantImage"
        />
        <div className="restaurantInfo">
          <h1>{restaurant.name}</h1>
          <p className="cuisine">{restaurant.cuisine}</p>
          <p className="location">📍 {restaurant.location}</p>
          <p className="rating">⭐ {restaurant.rating.toFixed(1)}</p>
        </div>
      </div>

      {/* Optional sections */}
      <div className="restaurantMenu">
        <h2>Menu / Items</h2>
        <p>Coming soon...</p>
      </div>

      <div className="restaurantReviews">
        <h2>Reviews</h2>
        <p>Coming soon...</p>
      </div>
    </div>
  );
};

export default RestaurantPage;
