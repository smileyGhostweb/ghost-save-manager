import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

interface IUser {
  username: string;
  email: string;
  passwordHash: string;
  role: 'user' | 'admin' | 'moderator';
  avatar?: string;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  isActive: boolean;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin', 'moderator'], default: 'user' },
    avatar: String,
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: String,
    lastLogin: Date,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next();
  this.passwordHash = await bcryptjs.hash(this.passwordHash, 10);
  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  return bcryptjs.compare(password, this.passwordHash);
};

export const User = mongoose.model<IUser>('User', userSchema);
