import { NextResponse } from 'next/server';
import dbConnect from '../../lib/dbConnect';
import User from '../../models/Users';
// import { getToken } from 'next-auth/jwt';

export async function GET(req) {
  await dbConnect();

  try {
    const users = await User.find({});
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error fetching users' }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  try {
    const user = await User.create(body);
    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
