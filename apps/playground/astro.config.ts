import mdx from '@astrojs/mdx';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import comments from 'astro-headless-comments';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'http://localhost:4321',
  server: {
    port: 4321,
  },
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [mdx(), sitemap(), comments()],
  output: 'server',
});
