import { Router } from 'express';
import Article from '../models/Article.js';
import Comment from '../models/Comment.js';
import { attachCommentCounts } from '../utils/articleHelpers.js';

const router = Router();

// Get statistics
router.get('/', async (req, res) => {
  const articles = await attachCommentCounts(await Article.find());
  const totalComments = await Comment.countDocuments();

  const categoryCounts = articles.reduce((acc, article) => {
    acc[article.category] = (acc[article.category] || 0) + 1;
    return acc;
  }, {});

  res.json({
    statistics: {
      totalBlogs: articles.length,
      totalViews: articles.reduce((sum, a) => sum + a.views, 0),
      totalLikes: articles.reduce((sum, a) => sum + a.likes, 0),
      totalComments,
      byCategory: Object.entries(categoryCounts).map(([name, value]) => ({ name, value })),
      blogs: articles.map((a) => ({
        id: a.id,
        title: a.title,
        views: a.views,
        likes: a.likes,
        comments: a.comments,
      })),
    },
  });
});

export default router;