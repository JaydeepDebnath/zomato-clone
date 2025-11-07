"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./Header.scss";
import Image from "next/image";
import Logo from "../../assets/images/Zomato-Logo.png";
import BlackLogo from "../../assets/images/blackLogo.webp";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Fetch unique cities from backend
  useEffect(() => {
    fetch("/api/restaurant")
      .then((res) => res.json())
      .then((data) => {
        const uniqueCities = [...new Set(data.map((r) => r.location))];
        setCities(uniqueCities);
        if (uniqueCities.length) setSelectedCity(uniqueCities[0]);
      })
      .catch((err) => console.error("Failed to fetch cities:", err));
  }, []);

  const handleSearch = () => {
    if (!searchQuery) return;
    router.push(`/search?query=${encodeURIComponent(searchQuery)}&city=${encodeURIComponent(selectedCity)}`);
  };

  return (
    <header className="header">
      {/* Top Nav */}
      <nav>
        <span>Get the App</span>
        <div className="right">
          <span onClick={() => router.push("/investor-relations")}>Investor Relations</span>
          <span onClick={() => router.push("/add-restaurant")}>Add Restaurant</span>
          <span onClick={() => router.push("/signin")}>Log in</span>
          <span onClick={() => router.push("/signup")}>Sign up</span>
        </div>
      </nav>

      {/* Hamburger Menu */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <CloseIcon style={{ color: "black" }} /> : <MenuIcon />}
      </div>

      {menuOpen && (
        <div className="sideMenu">
          <Image src={BlackLogo} alt="Zomato logo" width={120} height={40} />
          <div className="innerMenu">
            <span onClick={() => router.push("/investor-relations")}>Investor Relations</span>
            <span onClick={() => router.push("/add-restaurant")}>Add Restaurant</span>
            <span onClick={() => router.push("/signin")}>Log In</span>
            <span onClick={() => router.push("/signup")}>Sign Up</span>
          </div>
        </div>
      )}

      {/* Main Header Content */}
      <div className="headerContent">
        <Image src={Logo} alt="Zomato logo" width={150} height={50} />
        <h3>Discover the best food & drinks in {selectedCity || "your city"}</h3>

        <div className="input">
          {/* City Dropdown */}
          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search for restaurant, cuisine or a dish"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          {/* Optional Search Button */}
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
