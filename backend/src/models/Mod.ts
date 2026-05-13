import mongoose from 'mongoose';

interface IMod {
  name: string;
  description: string;
  userId: mongoose.Types.ObjectId;
  gameName: string;
  fileUrl: string;
  version: string;
  downloadCount: number;
  isApproved: boolean;
  reportCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const modSchema = new mongoose.Schema<IMod>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    gameName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    version: { type: String, default: '1.0.0' },
    downloadCount: { type: Number, default: 0 },
    isApproved: { type: Boolean, default: false },
    reportCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

modSchema.index({ gameName: 1, isApproved: 1 });
modSchema.index({ userId: 1 });

export const Mod = mongoose.model<IMod>('Mod', modSchema);
