import {renderActivity} from './activity-assets.mjs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
console.log(renderActivity(path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..')));
