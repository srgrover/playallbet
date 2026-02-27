// prisma.config.ts
import { defineConfig } from '@prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL!,          // <- aquí va tu Supabase URL
    // shadowDatabaseUrl: process.env.SHADOW_DATABASE_URL, // opcional
  },
});