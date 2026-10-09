import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Article from './models/Article.js';
import User from './models/User.js';
import Comment from './models/Comment.js';

dotenv.config();

const articles = [
  {
    title: 'Getting Started with React',
    author: 'Renz San Diego',
    date: '2026-10-01',
    category: 'React',
    description: 'A beginner-friendly look at components and JSX.',
    content:
      'React lets you build interfaces out of small, reusable components. In this blog we go through setting up a Vite project, writing your first component, and using JSX to describe the UI.',
    likes: 42,
    views: 310,
  },
  {
    title: 'Understanding useState',
    author: 'Guest User',
    date: '2026-10-03',
    category: 'React',
    description: 'How a component remembers values between renders.',
    content:
      'useState lets a component remember values between renders. Calling the setter function triggers a re-render so the screen always matches the latest state.',
    likes: 65,
    views: 520,
  },
  {
    title: 'Routing with React Router',
    author: 'Renz San Diego',
    date: '2026-10-05',
    category: 'Web Development',
    description: 'Creating multiple pages in a single-page app.',
    content:
      'React Router lets you create multiple pages in a single-page app. We cover BrowserRouter, Routes, Route, and Link, and how URLs map to components.',
    likes: 30,
    views: 245,
  },
  {
    title: 'Props vs State',
    author: 'Guest User',
    date: '2026-10-07',
    category: 'JavaScript',
    description: 'The difference between data passed in and data owned.',
    content:
      'Props are passed down to a component and are read-only, while state is owned by the component and can change over time. Knowing which to use keeps your app predictable.',
    likes: 51,
    views: 402,
  },
  {
    title: 'Styling with CSS Flexbox',
    author: 'Renz San Diego',
    date: '2026-10-08',
    category: 'Web Development',
    description: 'Laying out pages the easy way with Flexbox.',
    content:
      'Flexbox makes it easy to align and distribute space between items in a container. We look at flex direction, justify-content, align-items, and gap.',
    likes: 24,
    views: 188,
  },
];

// index = posisyon ng article sa listahan sa taas
const comments = [
  { index: 0, author: 'Guest User', text: 'Very helpful intro, thanks!', date: '2026-10-02' },
  { index: 0, author: 'Maria Santos', text: 'Finally understood components.', date: '2026-10-03' },
  { index: 1, author: 'Carlo Mendoza', text: 'The re-render explanation is clear.', date: '2026-10-04' },
  { index: 1, author: 'Ana Villanueva', text: 'Can you cover useEffect next?', date: '2026-10-05' },
  { index: 2, author: 'Dray Pasion', text: 'Routing finally makes sense.', date: '2026-10-06' },
  { index: 3, author: 'Jose Mari Chan', text: 'Props vs state in one post, nice.', date: '2026-10-08' },
  { index: 4, author: 'Maria Santos', text: 'Flexbox saved my layout!', date: '2026-10-09' },
];

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected. Seeding...');

  await Promise.all([Article.deleteMany(), User.deleteMany(), Comment.deleteMany()]);

  await User.create([
    {
      name: 'Renz San Diego',
      email: 'renz@example.com',
      password: await bcrypt.hash('password123', 10),
      contact: '0900 000 0000',
      program: 'BS in Computer Science',
      yearLevel: '3rd Year',
      bio: 'Author of this blog site. Loves building things with React.',
    },
    {
      name: 'Guest User',
      email: 'guest@example.com',
      password: await bcrypt.hash('guest123', 10),
    },
  ]);

  const savedArticles = await Article.create(articles);

  await Comment.create(
    comments.map(({ index, author, text, date }) => ({
      article: savedArticles[index]._id,
      author,
      text,
      date,
    }))
  );

  console.log('Seed complete: 2 users, 5 articles, 7 comments');
  await mongoose.disconnect();
};

run().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});