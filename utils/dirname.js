import path from 'path';
import { fileURLToPath } from 'url';
// normal dirname doesn't work on Node when using ES6
export const __dirname = path.dirname(fileURLToPath(import.meta.url));