import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { passkey } from 'better-auth/plugins/passkey';
import type { SocialProviders } from 'better-auth/social-providers';

import { db } from '../db';

// Load the available social providers from the environments.
const loadSocialProviders = (): SocialProviders | undefined => {
  const providers: SocialProviders = {};
  // Try to load the github provider.
  if (process.env.GITHUB_CLIENT_ID !== undefined && process.env.GITHUB_CLIENT_SECRET !== undefined) {
    providers.github = { clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET };
  }

  return providers;
};

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: loadSocialProviders(),
  plugins: [passkey()],
  database: drizzleAdapter(db, {
    provider: 'sqlite',
  }),
});