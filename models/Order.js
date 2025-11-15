import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
}, { _id: false });

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    restaurant: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Restaurant", 
      required: true 
    },

    items: [OrderItemSchema],

    total: { type: Number, required: true },

    paymentMethod: { 
      type: String, 
      enum: ["card", "upi", "cod"], 
      default: "card" 
    },

    deliveryAddress: {
      label: String,
      addressLine: String,
      city: String,
      zipcode: String,
      state: String,
      country: String
    },

    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "preparing",
        "on-the-way",
        "delivered",
        "cancelled"
      ],
      default: "pending"
    },

    deliveryTimeEstimate: { type: Number }, 
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
