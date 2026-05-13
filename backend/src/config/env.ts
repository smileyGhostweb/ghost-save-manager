export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000'),
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/ghost-save-manager',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'your_refresh_secret',
  jwtExpiry: process.env.JWT_EXPIRY || '7d',
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
  encryptionKey: process.env.ENCRYPTION_KEY || 'your_encryption_key',
  fileUploadDir: process.env.FILE_UPLOAD_DIR || './uploads',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '52428800'),
  adminEmail: process.env.ADMIN_EMAIL || 'tortimothygaming@gmail.com',
  adminUsername: process.env.ADMIN_USERNAME || 'Digital Ghost Pulse',
};
