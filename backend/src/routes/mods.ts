import express, { Request, Response } from 'express';
import { Mod } from '../models/Mod';
import { authMiddleware } from '../middleware/auth';
import multer from 'multer';
import { config } from '../config/env';

const router = express.Router();
const upload = multer({ dest: config.fileUploadDir });

// Get all approved mods
router.get('/', async (req: Request, res: Response) => {
  try {
    const { gameName } = req.query;
    const query = { isApproved: true } as any;
    if (gameName) query.gameName = gameName;

    const mods = await Mod.find(query).sort({ downloadCount: -1 });
    res.json(mods);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch mods' });
  }
});

// Get user's mods
router.get('/user/my-mods', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const mods = await Mod.find({ userId });
    res.json(mods);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch mods' });
  }
});

// Upload mod
router.post('/upload', authMiddleware, upload.single('file'), async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { name, description, gameName, version } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const mod = new Mod({
      name,
      description,
      gameName,
      userId,
      fileUrl: `/uploads/${file.filename}`,
      version: version || '1.0.0',
      isApproved: false, // Requires moderation
    });

    await mod.save();
    res.status(201).json(mod);
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Report mod
router.post('/:id/report', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const mod = await Mod.findById(id);

    if (!mod) {
      return res.status(404).json({ error: 'Mod not found' });
    }

    mod.reportCount += 1;
    await mod.save();

    res.json({ message: 'Mod reported', reportCount: mod.reportCount });
  } catch (error) {
    res.status(500).json({ error: 'Report failed' });
  }
});

export default router;
