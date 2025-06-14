// lib/models/news.js
import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.News || mongoose.model("News", newsSchema);
