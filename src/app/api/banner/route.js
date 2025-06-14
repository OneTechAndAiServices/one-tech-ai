// import { NextResponse } from 'next/server';
// import connectDB from '../../lib/dbConnect';
// import Notice from '../../models/Banner';

// // GET request: get all notices
// export async function GET() {
//   await connectDB();
//   const notices = await Notice.find().sort({ createdAt: -1 });
//   return NextResponse.json(notices);
// }

// // PUT request: update a specific notice by ID
// export async function PUT(req) {
//   await connectDB();
//   const { id, heading, description } = await req.json();

//   if (!id) {
//     return NextResponse.json({ error: 'ID is required for update' }, { status: 400 });
//   }

//   const updated = await Notice.findByIdAndUpdate(
//     id,
//     { heading, description },
//     { new: true }
//   );

//   if (!updated) {
//     return NextResponse.json({ error: 'Notice not found' }, { status: 404 });
//   }

//   return NextResponse.json(updated, { status: 200 });
// }
import { NextResponse } from 'next/server';
import connectDB from '../../lib/dbConnect'
import Notice from '../../models/Banner';

// GET: Fetch the single notice
export async function GET() {
  try {
    await connectDB();
    let notice = await Notice.findOne();

    // If no notice exists, create a default one
    if (!notice) {
      notice = await Notice.create({
        heading: 'Default Heading',
        description: 'Default Description',
      });
    }

    return NextResponse.json(notice, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

// PUT: Update the existing notice
export async function PUT(req) {
  try {
    await connectDB();
    const { id, heading, description } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required for update' }, { status: 400 });
    }

    const updated = await Notice.findByIdAndUpdate(
      id,
      { heading, description },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Notice not found' }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
