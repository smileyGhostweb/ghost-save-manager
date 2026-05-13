import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { config } from '../config/env';
import { validationResult, body } from 'express-validator';

const router = express.Router();

router.post(
  '/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    body('username').isLength({ min: 3 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password, username } = req.body;

      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(409).json({ error: 'Email or username already exists' });
      }

      const user = new User({
        email,
        username,
        passwordHash: password,
        role: 'user',
      });

      await user.save();

      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        config.jwtSecret,
        { expiresIn: config.jwtExpiry }
      );

      res.status(201).json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json({ error: 'Registration failed' });
    }
  }
);

router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').exists(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      user.lastLogin = new Date();
      await user.save();

      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        config.jwtSecret,
        { expiresIn: config.jwtExpiry }
      );

      res.json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  }
);

export default router;
