// lib/db.js को update करें (debugging के लिए)
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

console.log('MONGODB_URI:', MONGODB_URI ? 'Found' : 'Not Found');

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  console.log('Attempting to connect to MongoDB...');
  
  if (cached.conn) {
    console.log('Using cached connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB Connected Successfully to:', mongoose.connection.name);
      return mongoose;
    }).catch((error) => {
      console.error('❌ MongoDB Connection Failed:', error.message);
      console.error('Full error:', error);
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('Connection error in cache:', e);
    throw e;
  }

  return cached.conn;
}