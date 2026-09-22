/* One command to regenerate the static build from the app's own data.
 *   npm run build:html
 * Bundles lib/content.ts + lib/legal.ts, emits HTML, compiles Tailwind,
 * and copies the JS and images across. */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const run = (cmd) => execSync(cmd, { stdio: 'inherit' });

fs.mkdirSync('build', { recursive: true });
fs.mkdirSync('html/assets/images', { recursive: true });

run('npx esbuild lib/content.ts --bundle --format=esm --platform=node --outfile=build/content.mjs --log-level=error');
run('npx esbuild lib/legal.ts --bundle --format=esm --platform=node --outfile=build/legal.mjs --log-level=error');
run('node build/generate.mjs');
run('npx @tailwindcss/cli -i build/tailwind-input.css -o html/assets/styles.css --minify');

fs.copyFileSync('build/app-src.js', 'html/assets/app.js');
for (const f of fs.readdirSync('public/images').filter((f) => f.endsWith('.jpg'))) {
  fs.copyFileSync(path.join('public/images', f), path.join('html/assets/images', f));
}
console.log('\nStatic build ready in html/');
