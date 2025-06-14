import { NextResponse } from 'next/server';


import dbConnect from '@/app/lib/dbConnect';
import Product from '@/app/models/Product';

export async function GET(request) {
  await dbConnect();
  
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';
    const status = searchParams.get('status') || '';
    const page = parseInt(searchParams.get('page') || 1 );
    const limit = parseInt(searchParams.get('limit') || 10);
    const sortField = searchParams.get('sortField') || 'createdAt';
    const sortOrder = parseInt(searchParams.get('sortOrder') || -1);

    const query = {};
    
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { sku: { $regex: q, $options: 'i' } },
      ];
    }
    
    if (status && status !== 'all') {
      query.status = status;
    }

    const total = await Product.countDocuments(query);
    const data = await Product.find(query)
      .sort({ [sortField]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({ data, total });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await dbConnect();
  
  try {
    const body = await request.json();
    const product = new Product(body);
    const savedProduct = await product.save();
    
    return NextResponse.json(savedProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}