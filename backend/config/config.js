module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/aicte_curriculum',
  // WARNING: Never use this fallback in production; JWT_SECRET environment variable must always be set.
  JWT_SECRET: process.env.JWT_SECRET || 'aicte_curriculum_secret_key_2024_secure',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  NODE_ENV: process.env.NODE_ENV || 'development'
};

