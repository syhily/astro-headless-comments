import type { AstroIntegration } from 'astro';
import { envField } from 'astro/config';

import { registerPages } from './pages';

// The entrypoint for comments integration.
export default function Comments(): AstroIntegration {
  return {
    name: 'astro-headless-comments',
    hooks: {
      'astro:config:setup': ({ injectRoute, addMiddleware, updateConfig }) => {
        // Inject the comments router for serving all the comments requests.
        registerPages(injectRoute);
        // Inject the auth middleware for having the auth context.
        addMiddleware({ order: 'pre', entrypoint: new URL('./auth/middleware.ts', import.meta.url) });
        // Add the required environment variables to astro configuration.
        updateConfig({
          env: {
            schema: {
              LIBSQL_DATABASE_URL: envField.string({ context: 'server', access: 'secret' }),
              LIBSQL_AUTH_TOKEN: envField.string({ context: 'server', access: 'secret' }),
            },
            validateSecrets: true,
          },
        });
      },
    },
  };
}
