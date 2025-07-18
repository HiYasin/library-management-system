
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const config = {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DB_URL,
    environment: process.env.NODE_ENV || 'development',
}