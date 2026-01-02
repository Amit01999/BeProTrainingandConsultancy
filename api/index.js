// ESM wrapper for CommonJS bundle
// This file is needed because Vercel only auto-detects .js files,
// but our bundle is CommonJS and package.json has "type": "module"

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Import the CommonJS bundle
const handler = require('./index.cjs').default;

export default handler;
