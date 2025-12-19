// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    trim: true,
  },
  
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    lowercase: true,
  },
  
  password: {
    type: String,
    required: [true, 'Please enter password'],
    minlength: 6,
    select: false,
  },
  
  phone: {
    type: String,
  },
  
  avatar: {
    type: String,
    default: '/default-avatar.png'
  },
  
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  
  addresses: [
    {
      name: String,
      street: String,
      city: String,
      state: String,
      pinCode: String,
      phone: String,
      isDefault: {
        type: Boolean,
        default: false
      }
    }
  ],
  
  wishlist: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      addedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1
      },
      size: String,
      color: String
    }
  ],
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function() {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.models.User || mongoose.model('User', userSchema);