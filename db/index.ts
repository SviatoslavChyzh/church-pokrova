import { drizzle } from 'drizzle-orm/libsql';

import { createClient } from '@libsql/client';
import { z } from 'zod';
import { sessionTable, userTable } from './schemas/authentication';

const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  TURSO_AUTH_TOKEN: z.string(),
});

const precessEnv = EnvSchema.parse(process.env);

const turso = createClient({
  url: precessEnv.DATABASE_URL as string,
  authToken: precessEnv.TURSO_AUTH_TOKEN,
});

export const db = drizzle(turso, {
  schema: {
    user: userTable,
    session: sessionTable,
  },
});
