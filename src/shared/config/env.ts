import dotenv from 'dotenv';
dotenv.config();

// Fail-fast: crash at startup if critical env vars are missing
function requireEnv(key: string): string {
    const val = process.env[key];
    if (!val) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return val;
}

export const config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    jwtSecret: requireEnv('JWT_SECRET'),
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
    databaseUrl: requireEnv('DATABASE_URL'),
};
