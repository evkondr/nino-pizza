import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';
const isDevelopment = process.env.NODE_ENV === 'development';
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: "tsx prisma/seed.ts"
  },
  datasource: {
    url: env(isDevelopment ? 'LOCAL_DATABASE_URL' : 'POSTGRES_URL'),
  },
});