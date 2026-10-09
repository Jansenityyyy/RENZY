import { Router } from 'express';
import Article from '../models/Article.js';
import Comment from '../models/Comment.js';
import { attachCommentCounts } from '../utils/articleHelpers.js';

const router = Router();

const ALLOWED_FIELDS = ['title', 'category', 'description', 'content', 'author'];

const pickFields = (body = {}) =>
  Object.fromEntries(
    ALLOWED_FIELDS.filter((field) => body[field] !== undefined).map((field) => [
      field,
      body[field],
    ])
  );

// Get all articles
router.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: -1 });
  res.json({ articles: await attachCommentCounts(articles) });
});

// Get a single article
router.get('/:id', async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) return res.status(404).json({ message: 'Article not found' });

  const [withCount] = await attachCommentCounts([article]);
  res.json({ article: withCount });
});

// Create an article
router.post('/create', async (req, res) => {
  const article = await Article.create(pickFields(req.body));
  res.status(201).json({ message: 'Article created', article });
});

// Like an article
router.patch('/:id/like', async (req, res) => {
  const article = await Article.findByIdAndUpdate(
    req.params.id,
    { $inc: { likes: 1 } },
    { new: true }
  );
  if (!article) return res.status(404).json({ message: 'Article not found' });

  res.json({ message: 'Article liked', article });
});

// Update an article
router.patch('/:id', async (req, res) => {
  const article = await Article.findByIdAndUpdate(
    req.params.id,
    pickFields(req.body),
    { new: true, runValidators: true }
  );
  if (!article) return res.status(404).json({ message: 'Article not found' });

  res.json({ message: 'Article updated', article });
});

// Delete an article (kasama ang mga comments nito)
router.delete('/:id', async (req, res) => {
  const article = await Article.findByIdAndDelete(req.params.id);
  if (!article) return res.status(404).json({ message: 'Article not found' });

  await Comment.deleteMany({ article: article._id });
  res.json({ message: 'Article deleted' });
});

export default router;