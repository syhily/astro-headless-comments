// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import comments from 'astro-headless-comments';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'http://localhost:4321',
  server: {
    port: 4321,
  },
  integrations: [
    mdx(),
    sitemap(),
    comments(),
    {
      name: 'watch-plugin-files',
      hooks: {
        'astro:config:setup': ({ addWatchFile }) => {
          addWatchFile('../**/*');
        },
      },
    },
  ],
  output: 'server',
});
