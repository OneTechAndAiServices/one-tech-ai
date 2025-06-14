// import dbConnect from '../../lib/dbConnect';

// import Notice from '../../models/Notice';

// export async function GET() {
//   await dbConnect();
//   const notices = await Notice.find().sort({ createdAt: -1 });
//   return Response.json(notices);
// }

// export async function POST(req) {
//   await dbConnect();
//   const body = await req.json();
//   const newNotice = await Notice.create(body);
//   return Response.json(newNotice, { status: 201 });
// }




import dbConnect from '../../lib/dbConnect';
import Notice from '../../models/Notice';

export async function GET() {
  await dbConnect();
  const notices = await Notice.find().sort({ createdAt: -1 });
  return Response.json(notices);
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const newNotice = await Notice.create(body);
  return Response.json(newNotice, { status: 201 });
}

export async function PUT(req) {
  await dbConnect();
  const body = await req.json();
  const { _id, ...updateData } = body;

  if (!_id) {
    return Response.json({ error: 'Notice ID is required for update.' }, { status: 400 });
  }

  const updatedNotice = await Notice.findByIdAndUpdate(_id, updateData, { new: true });

  if (!updatedNotice) {
    return Response.json({ error: 'Notice not found.' }, { status: 404 });
  }

  return Response.json(updatedNotice);
}

export async function DELETE(req) {
  await dbConnect();
  const body = await req.json();
  const { _id } = body;

  if (!_id) {
    return Response.json({ error: 'Notice ID is required for deletion.' }, { status: 400 });
  }

  const deletedNotice = await Notice.findByIdAndDelete(_id);

  if (!deletedNotice) {
    return Response.json({ error: 'Notice not found.' }, { status: 404 });
  }

  return Response.json({ message: 'Notice deleted successfully.' });
}
