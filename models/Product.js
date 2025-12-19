// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
    trim: true,
  },
  
  description: {
    type: String,
  },
  
  price: {
    type: Number,
    required: [true, 'Please enter product price'],
    min: 0,
  },
  
  discountPrice: {
    type: Number,
    default: 0,
  },
  
  category: {
    type: String,
    required: true,
    enum: ['Fashion', 'Electronics', 'Home & Kitchen', 'Beauty', 'Sports', 'Books']
  },
  
  subcategory: {
    type: String,
  },
  
  images: [
    {
      url: {
        type: String,
        required: true
      },
      public_id: String,
    }
  ],
  
  stock: {
    type: Number,
    default: 1,
  },
  
  ratings: {
    type: Number,
    default: 0,
  },
  
  numOfReviews: {
    type: Number,
    default: 0,
  },
  
  featured: {
    type: Boolean,
    default: false,
  },
  
  brand: String,
  color: String,
  size: String,
  
  tags: [String],
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);