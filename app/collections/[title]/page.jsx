"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import "./CollectionPage.scss";

const CollectionPage = () => {
  const { title } = useParams(); // cuisine name
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/restaurants")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((r) => r.cuisine === title);
        setRestaurants(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [title]);

  if (loading) return <p>Loading {title} restaurants...</p>;
  if (restaurants.length === 0) return <p>No restaurants found for {title}.</p>;

  return (
    <div className="collectionPage">
      <h1>{title} Restaurants</h1>
      <div className="restaurantGrid">
        {restaurants.map((r) => (
          <div key={r._id} className="restaurantCard">
            <Image
              src={r.image || "/assets/images/default.png"}
              alt={r.name}
              width={250}
              height={150}
            />
            <h2>{r.name}</h2>
            <p>{r.cuisine}</p>
            <p>⭐ {r.rating?.toFixed(1) || "0.0"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
