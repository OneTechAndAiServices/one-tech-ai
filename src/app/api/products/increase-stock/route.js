import dbConnect from '@/app/lib/dbConnect';
import Product from '@/app/models/Product';
import { NextResponse } from 'next/server';

// import Product from '@/models/Product';
// import dbConnect from '@/app/lib/dbConnect';

export async function PUT(request) {
  await dbConnect();
  
  try {
    const { productIds } = await request.json();
    
    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json({ error: 'Invalid product IDs' }, { status: 400 });
    }

    const updateOperations = productIds.map(id => ({
      updateOne: {
        filter: { _id: id },
        update: { $inc: { stock: 1 } }
      }
    }));

    const result = await Product.bulkWrite(updateOperations);
    
    return NextResponse.json({ success: true, updatedCount: result.modifiedCount });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}