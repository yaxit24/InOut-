import { PrismaClient } from '@prisma/client';

// Singleton — one connection pool for the entire app lifetime
// Avoids exhausting database connections from repeated instantiation
const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
});

export default prisma;
