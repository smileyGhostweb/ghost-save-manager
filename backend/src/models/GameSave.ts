import mongoose from 'mongoose';

interface IGameSave {
  name: string;
  gameName: string;
  userId: mongoose.Types.ObjectId;
  fileUrl: string;
  fileName: string;
  format: 'json' | 'xml' | 'binary' | 'zip';
  size: number;
  checksum: string;
  isEncrypted: boolean;
  backupCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const gameSaveSchema = new mongoose.Schema<IGameSave>(
  {
    name: { type: String, required: true },
    gameName: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fileUrl: { type: String, required: true },
    fileName: { type: String, required: true },
    format: {
      type: String,
      enum: ['json', 'xml', 'binary', 'zip'],
      required: true,
    },
    size: { type: Number, required: true },
    checksum: { type: String, required: true },
    isEncrypted: { type: Boolean, default: true },
    backupCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

gameSaveSchema.index({ userId: 1, createdAt: -1 });

export const GameSave = mongoose.model<IGameSave>('GameSave', gameSaveSchema);
