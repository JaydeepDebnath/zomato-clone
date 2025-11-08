"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import "./CityPage.scss";

const CityPage = () => {
  const { name } = useParams(); // city name from URL
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!name) return;

    fetch(`/api/cities/${encodeURIComponent(name)}`)
      .then((res) => {
        if (!res.ok) throw new Error("City not found");
        return res.json();
      })
      .then((data) => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch city restaurants:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [name]);

  if (loading) return <p>Loading restaurants in {name}...</p>;
  if (error) return <p>{error}</p>;
  if (restaurants.length === 0) return <p>No restaurants found in {name}.</p>;

  return (
    <div className="cityPage">
      <h1>Restaurants in {name}</h1>
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
            <p>{r.cuisine || "Various cuisines"}</p>
            <p>⭐ {r.rating?.toFixed(1) || "0.0"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityPage;
