"use client";

import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, default: 0 },
  image: { type: String },
  location: { type: String },
  cuisine: { type: String },
});

export default mongoose.models.Restaurant || mongoose.model("Restaurant", RestaurantSchema);
