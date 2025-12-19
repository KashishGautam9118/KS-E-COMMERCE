// app/api/auth/register/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    await connectDB();
    console.log('✅ Register API called');

    // Get request data
    const { name, email, password, phone } = await request.json();

    console.log('📝 Received:', { name, email, phone });

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Name, email and password are required'
        },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password,
      phone: phone || ''
    });

    await newUser.save();

    // Create token
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Remove password from response
    const userResponse = newUser.toObject();
    delete userResponse.password;

    console.log('👤 User created:', newUser.email);
    console.log('📊 Total users:', await User.countDocuments());

    // Success response
    return NextResponse.json({
      success: true,
      message: 'Registration successful!',
      user: userResponse,
      token
    }, { status: 201 });

  } catch (error) {
    console.error('❌ Registration error:', error);

    return NextResponse.json({
      success: false,
      message: 'Registration failed. Please try again.',
      error: error.message
    }, { status: 500 });
  }
}

// Also add GET method to test if API is reachable
export async function GET() {
  try {
    await connectDB();
    const usersCount = await User.countDocuments();

    return NextResponse.json({
      success: true,
      message: 'Register API is working!',
      endpoint: '/api/auth/register',
      method: 'POST to register user',
      usersCount
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: error.message
    }, { status: 500 });
  }
}
