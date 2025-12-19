// app/api/products/search/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Product from '@/models/Product';

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // Build search query
    let searchQuery = {};
    
    if (query) {
      searchQuery.$or = [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
        { brand: { $regex: query, $options: 'i' } }
      ];
    }
    
    if (category) {
      searchQuery.category = category;
    }
    
    // Get products
    const products = await Product.find(searchQuery)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      products,
      count: products.length
    });
    
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { success: false, message: 'Search failed' },
      { status: 500 }
    );
  }
}