import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  isVeg: { type: Boolean, default: true },
  description: { type: String },
  image: { type: String }
});

const PhotoSchema = new mongoose.Schema({
  url: { type: String },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  uploadedAt: { type: Date, default: Date.now }
});

const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const RestaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    description: { type: String },

    image: { type: String },

    images: [String],                 

    location: { type: String },

    address: {
      addressLine: String,
      city: String,
      zipcode: String,
      state: String,
      country: String
    },

    cuisine: { type: String },

    menu: [MenuItemSchema],           // Menu Items

    photos: [PhotoSchema],            // User uploaded photos

    reviews: [ReviewSchema],          // User reviews

    rating: { type: Number, default: 0 },

    averageCost: { type: Number },    // Cost for two

    tags: [String],                   // trending, popular, new, etc.

    isFeatured: { type: Boolean, default: false },

    isOpen: { type: Boolean, default: true },

    openTime: { type: String },       // 10:00 AM
    closeTime: { type: String },      // 11:00 PM
  },
  { timestamps: true }
);

export default mongoose.models.Restaurant || mongoose.model("Restaurant", RestaurantSchema);
