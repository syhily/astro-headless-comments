import { createAuthClient } from 'better-auth/client';

// Remember to correctly configure the site in astro.config.ts.
export const authClient = createAuthClient({ baseURL: import.meta.env.SITE });
