// models/Cart.js
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
      size: String,
      color: String,
      price: Number,
      name: String,
      image: String,
    }
  ],
  
  totalPrice: {
    type: Number,
    default: 0,
  },
  
  totalItems: {
    type: Number,
    default: 0,
  },
  
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Cart || mongoose.model('Cart', cartSchema);