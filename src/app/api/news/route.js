// app/api/news/route.js
import { NextResponse } from "next/server";
import connectDB from "../../lib/dbConnect";
import News from "../../models/News";

export async function GET() {
  await connectDB();
  const news = await News.find().sort({ createdAt: -1 });
  return NextResponse.json(news);
}

export async function PUT(req) {
  await connectDB();
  const { id, title, description } = await req.json();

  if (!title || !description) {
    return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
  }

  if (id) {
    // Update existing news
    const updatedNews = await News.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!updatedNews) {
      return NextResponse.json({ error: "News item not found" }, { status: 404 });
    }

    return NextResponse.json(updatedNews);
  } else {
    // Create new news
    const newNews = new News({ title, description });
    await newNews.save();
    return NextResponse.json(newNews, { status: 201 });
  }
}

