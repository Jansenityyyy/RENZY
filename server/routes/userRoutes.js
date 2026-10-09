import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = Router();

const PROFILE_FIELDS = ['name', 'contact', 'program', 'yearLevel', 'bio'];

// Register
router.post('/register', async (req, res) => {
  const { name, email, password, contact, program, yearLevel } = req.body ?? {};

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return res.status(409).json({ message: 'Email is already registered' });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashed,
    contact,
    program,
    yearLevel,
  });

  res.status(201).json({ message: 'Registration successful', user });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  const valid = user && (await bcrypt.compare(password, user.password));

  if (!valid) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.json({ message: 'Login successful', user });
});

// Get profile
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json({ user });
});

// Update profile
router.patch('/:id', async (req, res) => {
  const updates = Object.fromEntries(
    PROFILE_FIELDS.filter((field) => req.body?.[field] !== undefined).map((field) => [
      field,
      req.body[field],
    ])
  );

  const user = await User.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json({ message: 'Profile updated', user });
});

// Change password
router.patch('/:id/password', async (req, res) => {
  const { currentPassword, newPassword } = req.body ?? {};

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Current and new password are required' });
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ message: 'New password must be at least 6 characters' });
  }

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const matches = await bcrypt.compare(currentPassword, user.password);
  if (!matches) {
    return res.status(401).json({ message: 'Current password is incorrect' });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ message: 'Password changed successfully' });
});

export default router;