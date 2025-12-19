// app/api/cart/add/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Cart from '@/models/Cart';
import Product from '@/models/Product';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    await connectDB();
    
    // Get token from header
    const token = request.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Please login to add to cart' },
        { status: 401 }
      );
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    
    const { productId, quantity = 1 } = await request.json();
    
    // Get product
    const product = await Product.findById(productId);
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Find user's cart
    let cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      // Create new cart
      cart = new Cart({
        user: userId,
        items: []
      });
    }
    
    // Check if product already in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );
    
    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity,
        price: product.discountPrice > 0 ? product.discountPrice : product.price,
        name: product.name,
        image: product.images[0]?.url || '/default-product.jpg'
      });
    }
    
    // Update totals
    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + (item.price * item.quantity),
      0
    );
    
    await cart.save();
    
    return NextResponse.json({
      success: true,
      message: 'Product added to cart',
      cart
    });
    
  } catch (error) {
    console.error('Add to cart error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add to cart' },
      { status: 500 }
    );
  }
}