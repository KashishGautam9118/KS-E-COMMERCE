// seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import User from './models/User.js';

dotenv.config();

const products = [
  {
    name: 'Nike Air Max 270',
    price: 10799,
    discountPrice: 8299,
    category: 'Fashion',
    subcategory: 'footwear',
    description: 'Comfortable running shoes',
    images: [{ url: '/Featured Products/Nike Air Max 270.jpeg' }],
    stock: 50,
    brand: 'Nike',
    featured: true
  },
  {
    name: 'Apple iPhone 15 Pro',
    price: 82999,
    category: 'Electronics',
    description: 'Latest iPhone with advanced features',
    images: [{ url: '/Featured Products/Apple iPhone 15 Pro.jpeg' }],
    stock: 30,
    brand: 'Apple',
    featured: true
  },
  {
    name: 'Atomic Habits by James Clear',
    price: 1327,
    discountPrice: 1077,
    category: 'Books',
    subcategory: 'Self-Help',
    description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    images: [{ url: '/Featured Products/Atomic Habits.jpeg' }],
    stock: 100,
    brand: 'Penguin',
    featured: true
  },
  {
    name: 'Adidas Adjustable Dumbbells Set',
    price: 6639,
    discountPrice: 4979,
    category: 'Sports',
    subcategory: 'Fitness',
    description: 'Adjustable weight dumbbells for home workout',
    images: [{ url: '/Featured Products/Adidas Dumbbells Set.jpeg' }],
    stock: 25,
    brand: 'Adidas',
    featured: true
  },
  {
    name: 'Levi\'s 501 Original Fit Jeans',
    price: 89.99,
    discountPrice: 74.99,
    category: 'Fashion',
    subcategory: 'Clothing',
    description: 'Iconic straight leg jeans with button fly',
    images: [{ url: '/Featured Products/Levi 501 Original Jeans.jpeg' }],
    stock: 80,
    brand: 'Levi\'s',
    featured: true
  },
  {
    name: 'Ray-Ban Aviator Sunglasses',
    price: 13279,
    discountPrice: 9959,
    category: 'Fashion',
    subcategory: 'Accessories',
    description: 'Classic aviator style with UV protection',
    images: [{ url: '/Featured Products/Ray-Ban Aviator Sunglasses.png' }],
    stock: 35,
    brand: 'Ray-Ban',
    featured: true
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    
    // Add products
    await Product.insertMany(products);
    
    // Create admin user
    const adminUser = new User({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });
    await adminUser.save();
    
    console.log('✅ Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();