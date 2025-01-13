import { LIBSQL_AUTH_TOKEN, LIBSQL_DATABASE_URL } from 'astro:env/server';

import type { DbConfig } from '../../types';

// Load the database configuration.
export const loadDbConfig = (): DbConfig => {
  const url = LIBSQL_DATABASE_URL;
  const token = LIBSQL_AUTH_TOKEN;

  return { url, token };
};
