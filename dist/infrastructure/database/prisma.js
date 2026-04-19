"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
// Singleton — one connection pool for the entire app lifetime
// Avoids exhausting database connections from repeated instantiation
const prisma = new client_1.PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
});
exports.default = prisma;
