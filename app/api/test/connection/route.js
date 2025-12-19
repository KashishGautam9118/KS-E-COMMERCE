// app/api/test/connection/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
    // Try to connect directly
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      return NextResponse.json({
        success: false,
        message: 'MONGODB_URI not found in .env.local',
        env: process.env.MONGODB_URI ? 'Found' : 'Not found'
      });
    }
    
    // Test connection
    await mongoose.connect(MONGODB_URI);
    
    const isConnected = mongoose.connection.readyState === 1;
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB Test',
      connected: isConnected,
      connectionState: mongoose.connection.readyState,
      // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
      database: mongoose.connection.name,
      host: mongoose.connection.host
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Connection failed',
      error: error.message,
      stack: error.stack
    });
  }
}