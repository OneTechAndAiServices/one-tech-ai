// // app/api/timings/route.js
// import { NextResponse } from 'next/server';

// import dbConnect from '../../lib/dbConnect';
// import Timing from '../../models/Timing';
// // import dbConnect from '../../../lib/dbConnect';

// export async function GET() {
//   await dbConnect();
//   const timings = await Timing.find();
//   return NextResponse.json({ success: true, data: timings });
// }

// export async function POST(req) {
//   await dbConnect();
//   const body = await req.json();
//   const timing = await Timing.create(body);
//   return NextResponse.json({ success: true, data: timing });
// }

// export async function PUT(req) {
//   await dbConnect();
//   const body = await req.json();
//   const updated = await Timing.findOneAndUpdate({ day: body.day }, { hours: body.hours }, { new: true, upsert: true });
//   return NextResponse.json({ success: true, data: updated });
// }

// export async function DELETE(req) {
//   await dbConnect();
//   const body = await req.json();
//   await Timing.findOneAndDelete({ day: body.day });
//   return NextResponse.json({ success: true, message: 'Deleted' });
// }
import dbConnect from '../../lib/dbConnect';
import Timing from '../../models/Timing';

const allDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export async function GET() {
  await dbConnect();

  try {
    const timingsFromDb = await Timing.find({});
    const filledTimings = allDays.map((day) => {
      const found = timingsFromDb.find((item) => item.day === day);
      return {
        day,
        hours: found ? found.hours : "9:00 AM to 5:00 PM",
      };
    });

    return Response.json({ success: true, data: filledTimings });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(request) {
  await dbConnect();
  const { day, hours } = await request.json();

  if (!day || !hours) {
    return Response.json({ success: false, message: "Missing day or hours" }, { status: 400 });
  }

  try {
    const updated = await Timing.findOneAndUpdate(
      { day },
      { hours },
      { upsert: true, new: true }
    );

    return Response.json({ success: true, data: updated });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
