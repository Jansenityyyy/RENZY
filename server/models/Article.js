import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, default: 'Other', trim: true },
    description: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: String, required: true, trim: true },
    date: {
      type: String,
      default: () => new Date().toISOString().slice(0, 10),
    },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  { timestamps: true, toJSON: { virtuals: true, versionKey: false } }
);

export default mongoose.model('Article', articleSchema);