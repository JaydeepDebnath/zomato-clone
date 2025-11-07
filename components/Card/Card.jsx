"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./Card.scss";

const Card = () => {
  const [cards, setCards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/restaurant")
      .then((res) => res.json())
      .then((data) => {
        const cardData = data.map((r) => ({
          id: r._id,
          title: r.name,
          description: r.cuisine || "Explore this restaurant",
          image: r.image || "/assets/images/default.png",
          rating: r.rating || 0,
        }));
        setCards(cardData);
      })
      .catch((err) => console.error("Failed to fetch restaurants:", err));
  }, []);

  if (cards.length === 0) {
    return <p>Loading restaurants...</p>;
  }

  return (
    <div className="card">
      {cards.map((card) => (
        <div
          key={card.id}
          className="cardImg"
          onClick={() => router.push(`/restaurants/${card.id}`)}
          style={{ cursor: "pointer" }}
        >
          <Image
            src={card.image}
            alt={card.title}
            width={200}
            height={150}
            className="restaurantImage"
          />
          <h1>{card.title}</h1>
          <p className="description">{card.description}</p>
          <p className="rating">⭐ {card.rating.toFixed(1)}</p>
        </div>
      ))}
    </div>
  );
};

export default Card;
