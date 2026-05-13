import mongoose from 'mongoose';

interface IBackup {
  saveId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  fileUrl: string;
  size: number;
  version: number;
  createdAt: Date;
}

const backupSchema = new mongoose.Schema<IBackup>(
  {
    saveId: { type: mongoose.Schema.Types.ObjectId, ref: 'GameSave', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fileUrl: { type: String, required: true },
    size: { type: Number, required: true },
    version: { type: Number, required: true },
  },
  { timestamps: true }
);

backupSchema.index({ saveId: 1, version: -1 });

export const Backup = mongoose.model<IBackup>('Backup', backupSchema);
