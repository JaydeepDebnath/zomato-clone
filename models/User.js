import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  label: { type: String, required: true },            // Home, Work, etc.
  addressLine: { type: String, required: true },
  city: { type: String, required: true },
  zipcode: { type: String },
  state: { type: String },
  country: { type: String, default: "India" },
}, { _id: false });

const CardSchema = new mongoose.Schema({
  last4: { type: String, required: true },
  brand: { type: String, required: true },            // Visa, MasterCard
  expMonth: { type: Number, required: true },
  expYear: { type: Number, required: true },
}, { _id: false });

const RecentlyViewedSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  viewedAt: { type: Date, default: Date.now }
}, { _id: false });

const BookingSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true },
}, { _id: false });

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    avatar: { type: String, default: "" },       // Profile photo URL

    isAdmin: { type: Boolean, default: false },

    // ---- Stats for Dashboard ----
    stats: {
      reviews: { type: Number, default: 0 },
      photos: { type: Number, default: 0 },
      followers: { type: Number, default: 0 }
    },

    // ---- Followers ----
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // ---- Addresses ----
    addresses: [AddressSchema],

    // ---- Payment Cards ----
    cards: [CardSchema],

    // ---- Recently Viewed ----
    recentlyViewed: [RecentlyViewedSchema],

    // ---- Table Bookings ----
    bookings: [BookingSchema],

    deleted: { type: Boolean, default: false },  // Soft delete
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
