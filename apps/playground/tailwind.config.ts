import type { Config } from 'tailwindcss';

export default {
  content: ['./**/*.{astro,tsx,jsx,vue,html}'],
  theme: {
    extend: {},
  },
  plugins: [],
  blocklist: [],
} satisfies Config;
