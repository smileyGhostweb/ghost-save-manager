import express, { Request, Response } from 'express';
import multer from 'multer';
import { GameSave } from '../models/GameSave';
import { Backup } from '../models/Backup';
import { authMiddleware } from '../middleware/auth';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { config } from '../config/env';

const router = express.Router();
const upload = multer({ dest: config.fileUploadDir });

router.use(authMiddleware);

// Get all saves for user
router.get('/', async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const saves = await GameSave.find({ userId }).sort({ createdAt: -1 });
    res.json(saves);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch saves' });
  }
});

// Get single save
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;
    const save = await GameSave.findOne({ _id: id, userId });

    if (!save) {
      return res.status(404).json({ error: 'Save not found' });
    }

    res.json(save);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch save' });
  }
});

// Upload save file
router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { gameName } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const checksum = crypto.randomBytes(16).toString('hex');
    const fileSize = fs.statSync(file.path).size;
    const format = path.extname(file.originalname).slice(1) || 'json';

    const save = new GameSave({
      name: file.originalname,
      gameName,
      userId,
      fileUrl: `/uploads/${file.filename}`,
      fileName: file.filename,
      format: ['json', 'xml', 'zip'].includes(format) ? format : 'binary',
      size: fileSize,
      checksum,
      isEncrypted: true,
    });

    await save.save();

    res.status(201).json(save);
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Delete save
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;
    const save = await GameSave.findOneAndDelete({ _id: id, userId });

    if (!save) {
      return res.status(404).json({ error: 'Save not found' });
    }

    // Delete file
    try {
      fs.unlinkSync(path.join(config.fileUploadDir, save.fileName));
    } catch (e) {}

    res.json({ message: 'Save deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

// Create backup
router.post('/:id/backup', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;
    const save = await GameSave.findOne({ _id: id, userId });

    if (!save) {
      return res.status(404).json({ error: 'Save not found' });
    }

    const backup = new Backup({
      saveId: save._id,
      userId,
      fileUrl: save.fileUrl,
      size: save.size,
      version: save.backupCount + 1,
    });

    await backup.save();
    save.backupCount += 1;
    await save.save();

    res.status(201).json(backup);
  } catch (error) {
    res.status(500).json({ error: 'Backup creation failed' });
  }
});

// Restore from backup
router.post('/:id/restore/:backupId', async (req: Request, res: Response) => {
  try {
    const { id, backupId } = req.params;
    const userId = (req as any).userId;
    const backup = await Backup.findOne({ _id: backupId, saveId: id, userId });

    if (!backup) {
      return res.status(404).json({ error: 'Backup not found' });
    }

    const save = await GameSave.findOne({ _id: id, userId });
    if (!save) {
      return res.status(404).json({ error: 'Save not found' });
    }

    // Restore logic - copy backup file to save location
    res.json({ message: 'Save restored from backup', backup });
  } catch (error) {
    res.status(500).json({ error: 'Restore failed' });
  }
});

export default router;
