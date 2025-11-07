"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./Cities.scss";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/restaurant")
      .then((res) => res.json())
      .then((data) => {
        const cityCounts = data.reduce((acc, restaurant) => {
          const city = restaurant.location || "Unknown";
          acc[city] = (acc[city] || 0) + 1;
          return acc;
        }, {});

        const cityArray = Object.entries(cityCounts).map(([name, count]) => ({
          name,
          count,
        }));
        cityArray.sort((a, b) => b.count - a.count);

        setCities(cityArray);
      })
      .catch((err) => console.error("Failed to fetch cities:", err));
  }, []);

  const displayedCities = showAll ? cities : cities.slice(0, 8);

  return (
    <div className="cities">
      <h1>
        Popular localities in and around <span>Ahmedabad</span>
      </h1>
      <div className="cityContainer">
        {displayedCities.map((city, index) => (
          <div
            className="city"
            key={index}
            onClick={() => router.push(`/cities/${city.name}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="cityLeft">
              <h3>{city.name}</h3>
              {city.count && <span>{city.count} Places</span>}
            </div>
            <div className="icon">
              <ChevronRightIcon />
            </div>
          </div>
        ))}

        {cities.length > 8 && (
          <div
            className="city"
            onClick={() => setShowAll((prev) => !prev)}
            style={{ cursor: "pointer" }}
          >
            <div className="cityLeft">
              <h3>{showAll ? "See less" : "See more"}</h3>
            </div>
            <div className="icon">
              <KeyboardArrowDownIcon />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cities;
