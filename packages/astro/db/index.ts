import { type Client, createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

import { loadDbConfig } from './config';
import migrate from './migration';
import * as schema from './schema';

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  client: Client | undefined;
};
const { url, token } = loadDbConfig();

export const client = globalForDb.client ?? createClient({ url, authToken: token });
// Skip the client creation next time.
if (process.env.NODE_ENV !== 'production') {
  globalForDb.client = client;
}
// Trigger the database migration.
await migrate(client);

export const db = drizzle(client, { schema });
