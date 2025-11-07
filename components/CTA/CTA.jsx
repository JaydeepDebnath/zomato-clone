"use client";

import React, { useState } from "react";
import "./CTA.scss";
import Image from "next/image";
import Google from "../../assets/images/Google-Play.png";
import AppStore from "../../assets/images/App-Store.png";
import Phone from "../../assets/images/Iphone.png";

const CTA = () => {
  const [isEmail, setIsEmail] = useState(true);
  const [value, setValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value) {
      alert(`Please enter your ${isEmail ? "email" : "phone number"}`);
      return;
    }

    try {
      const res = await fetch("/api/send-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: isEmail ? "email" : "phone", value }),
      });

      if (res.ok) {
        alert("Link sent successfully!");
        setValue(""); // reset input
      } else {
        alert("Failed to send link. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending link");
    }
  };

  return (
    <div className="cta">
      {/* Left Section */}
      <div className="left">
        <Image src={Phone} alt="Zomato app on phone" />
      </div>

      {/* Right Section */}
      <div className="right">
        <h1>Get the Zomato app</h1>
        <p>
          We will send you a link, open it on your phone to download the app.
        </p>

        {/* Toggle between email and phone */}
        <div className="radio">
          <div className="radioBtn">
            <input
              type="radio"
              id="email"
              name="contact"
              checked={isEmail}
              onChange={() => setIsEmail(true)}
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="radioBtn">
            <input
              type="radio"
              id="phone"
              name="contact"
              checked={!isEmail}
              onChange={() => setIsEmail(false)}
            />
            <label htmlFor="phone">Phone</label>
          </div>
        </div>

        {/* Input field with handleSubmit */}
        <form className="input" onSubmit={handleSubmit}>
          {isEmail ? (
            <input
              type="email"
              placeholder="Email"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          ) : (
            <input
              type="tel"
              placeholder="Phone number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          )}
          <button type="submit">Share App Link</button>
        </form>

        {/* Download section */}
        <span>Download app from</span>
        <div className="img">
          <Image src={Google} alt="Google Play Store" />
          <Image src={AppStore} alt="Apple App Store" />
        </div>
      </div>
    </div>
  );
};

export default CTA;
