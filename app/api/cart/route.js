// app/api/cart/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Cart from '@/models/Cart';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  try {
    await connectDB();

    // Get token from header
    const token = request.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Please login to view cart' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Get user's cart
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart) {
      return NextResponse.json({
        success: true,
        cart: { items: [] }
      });
    }

    return NextResponse.json({
      success: true,
      cart: {
        items: cart.items.map(item => ({
          id: item.product._id.toString(),
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          product: item.product
        })),
        totalPrice: cart.totalPrice,
        totalItems: cart.totalItems
      }
    });

  } catch (error) {
    console.error('Get cart error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to get cart' },
      { status: 500 }
    );
  }
}
