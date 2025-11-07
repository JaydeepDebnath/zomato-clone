"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./Collection.scss";
import Image from "next/image";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const Collection = () => {
  const [collections, setCollections] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/restaurant")
      .then((res) => res.json())
      .then((data) => {
        const cuisineMap = {};

        data.forEach((restaurant) => {
          const cuisine = restaurant.cuisine || "Other";
          if (!cuisineMap[cuisine]) {
            cuisineMap[cuisine] = [];
          }
          if (cuisineMap[cuisine].length < 5) {
            cuisineMap[cuisine].push(restaurant);
          }
        });

        const collectionsArr = Object.keys(cuisineMap).map((cuisine) => ({
          title: cuisine,
          count: cuisineMap[cuisine].length,
          image: cuisineMap[cuisine][0]?.image || "/assets/images/collection4.webp",
        }));

        setCollections(collectionsArr);
      })
      .catch((err) => console.error("Failed to fetch collections:", err));
  }, []);

  return (
    <div className="collection">
      <h1>Collections</h1>

      <div className="collectionText">
        <p>
          Explore curated lists of top restaurants, cafes, pubs, and bars in
          Ahmedabad, based on trends
        </p>
        <span className="viewAll">
          All collections in Ahmedabad <ArrowRightIcon />
        </span>
      </div>

      <div className="collectionCard">
        {collections.length === 0 && <p>Loading collections...</p>}
        {collections.map((col, index) => (
          <div
            key={index}
            className="collectionImg"
            onClick={() =>
              router.push(`/collections/${encodeURIComponent(col.title)}`)
            }
            style={{ cursor: "pointer" }}
          >
            <Image
              src={col.image}
              alt={col.title}
              width={300}
              height={200}
              className="collectionImage"
            />
            <h3>{`Top ${col.count} ${col.title} Places`}</h3>
            <span>
              {col.count} Places <ArrowRightIcon />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;
