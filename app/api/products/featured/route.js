// app/api/products/featured/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '16');

    // Get featured products
    const products = await Product.find({ featured: true })
      .limit(limit)
      .sort({ name: 1 });

    return NextResponse.json({
      success: true,
      products,
      count: products.length
    });

  } catch (error) {
    console.error('Featured products error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch featured products' },
      { status: 500 }
    );
  }
}
