import { PrismaClient } from '@prisma/client';

let prisma;

const databaseUrl = 
  process.env.DATABASE_URL || 
  process.env.xstronomy_PRISMA_DATABASE_URL || 
  process.env.xstronomy_DATABASE_URL || 
  process.env.xstronomy_POSTGRES_URL;

const prismaOptions = databaseUrl ? { datasourceUrl: databaseUrl } : {};

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(prismaOptions);
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient(prismaOptions);
  }
  prisma = global.prisma;
}

export default prisma;
