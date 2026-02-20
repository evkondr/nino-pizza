import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

const isDevelopment = process.env.NODE_ENV === 'development';

const connectionString = isDevelopment  ? process.env.LOCAL_DATABASE_URL : process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error(`Database URL not defined for ${process.env.NODE_ENV} environment`);
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };