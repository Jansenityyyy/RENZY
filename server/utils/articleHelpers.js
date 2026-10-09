import Comment from '../models/Comment.js';

// Nagdadagdag ng "comments" count sa bawat article
export const attachCommentCounts = async (articles) => {
  const counts = await Comment.aggregate([
    { $group: { _id: '$article', total: { $sum: 1 } } },
  ]);
  const countMap = new Map(counts.map((c) => [String(c._id), c.total]));

  return articles.map((article) => ({
    ...article.toJSON(),
    comments: countMap.get(String(article._id)) || 0,
  }));
};