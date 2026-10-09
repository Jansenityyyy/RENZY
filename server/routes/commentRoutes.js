import { Router } from 'express';
import Comment from '../models/Comment.js';
import Article from '../models/Article.js';

const router = Router();

// Get all comments (pwedeng i-filter gamit ang ?article=<id>)
router.get('/', async (req, res) => {
  const filter = req.query.article ? { article: req.query.article } : {};
  const comments = await Comment.find(filter).sort({ createdAt: -1 });
  res.json({ comments });
});

// Get a single comment
router.get('/:id', async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(404).json({ message: 'Comment not found' });

  res.json({ comment });
});

// Create a comment
router.post('/create', async (req, res) => {
  const { article, author, text } = req.body ?? {};

  if (!article || !author || !text) {
    return res.status(400).json({ message: 'Article, author, and text are required' });
  }

  const articleExists = await Article.exists({ _id: article });
  if (!articleExists) {
    return res.status(404).json({ message: 'Article not found' });
  }

  const comment = await Comment.create({ article, author, text });
  res.status(201).json({ message: 'Comment created', comment });
});

// Update a comment
router.patch('/:id', async (req, res) => {
  const { text } = req.body ?? {};
  if (!text) return res.status(400).json({ message: 'Text is required' });

  const comment = await Comment.findByIdAndUpdate(
    req.params.id,
    { text },
    { new: true, runValidators: true }
  );
  if (!comment) return res.status(404).json({ message: 'Comment not found' });

  res.json({ message: 'Comment updated', comment });
});

// Delete a comment
router.delete('/:id', async (req, res) => {
  const comment = await Comment.findByIdAndDelete(req.params.id);
  if (!comment) return res.status(404).json({ message: 'Comment not found' });

  res.json({ message: 'Comment deleted' });
});

export default router;