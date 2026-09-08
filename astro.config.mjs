// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// Deployed as a GitHub Pages *project* site at
// https://mateogarciapepin.github.io/boutiqueai-landing-page/ — `base` must
// match the repo name. Files in public/ are referenced through
// import.meta.env.BASE_URL so they resolve under the subpath (see Base.astro
// and Hero.astro); bundled _astro/* assets get the prefix automatically.
// https://astro.build/config
export default defineConfig({
  site: 'https://mateogarciapepin.github.io',
  base: '/boutiqueai-landing-page',
  vite: {
    plugins: [tailwindcss()]
  }
});
