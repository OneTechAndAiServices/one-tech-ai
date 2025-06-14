import dbConnect from '@/app/lib/dbConnect';
import Product from '@/app/models/Product';
import { NextResponse } from 'next/server';
// import dbConnect from '@/lib/dbConnect';
// import Product from '@/models/Product';

export async function GET(request, { params }) {
  await dbConnect();
  
  try {
    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await dbConnect();
  
  try {
    const body = await request.json();
    const updatedProduct = await Product.findByIdAndUpdate(params.id, body, { new: true });
    
    if (!updatedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  
  try {
    const deletedProduct = await Product.findByIdAndDelete(params.id);
    
    if (!deletedProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}