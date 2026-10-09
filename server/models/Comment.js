import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
    author: { type: String, required: true, trim: true },
    text: { type: String, required: true, trim: true },
    date: {
      type: String,
      default: () => new Date().toISOString().slice(0, 10),
    },
  },
  { timestamps: true, toJSON: { virtuals: true, versionKey: false } }
);

export default mongoose.model('Comment', commentSchema);