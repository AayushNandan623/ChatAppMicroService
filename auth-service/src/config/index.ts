import dotenv from 'dotenv';

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  databaseUrl: process.env.DATABASE_URL || '',
  redisUrl: process.env.REDIS_URL || '',
  kafkaBrokers: process.env.KAFKA_BROKERS?.split(',') || [],
  jwtSecret: process.env.JWT_SECRET || 'change-me',
  logLevel: process.env.LOG_LEVEL || 'info',
  s3: {
    endpoint: process.env.S3_ENDPOINT || '',
    accessKey: process.env.S3_ACCESS_KEY || '',
    secretKey: process.env.S3_SECRET_KEY || '',
    bucket: process.env.S3_BUCKET || ''
  }
};
