// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    console.log('Login attempt for email:', email);

    // Find user with password
    const user = await User.findOne({ email }).select('+password');

    console.log('User found:', user ? 'Yes' : 'No');
    console.log('User password hash exists:', user && user.password ? 'Yes' : 'No');

    if (!user) {
      console.log('No user found with email:', email);
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(password);

    console.log('Password match:', isPasswordMatch);

    if (!isPasswordMatch) {
      console.log('Password does not match for user:', email);
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;
    
    return NextResponse.json({
      success: true,
      token,
      user: userResponse
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Login failed. Please try again.' },
      { status: 500 }
    );
  }
}