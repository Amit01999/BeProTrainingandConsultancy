// ESM wrapper for CommonJS bundle
// This file is needed because Vercel only auto-detects .js files,
// but our bundle is CommonJS and package.json has "type": "module"

import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

// Import the CommonJS bundle from dist directory
const handler = require(join(__dirname, '../dist/api-handler.cjs')).default;

export default handler;
