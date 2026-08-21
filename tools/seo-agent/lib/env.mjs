import { readFileSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';

// Credentials resolution, in order; env vars already set always win.
//  1. SEO_AGENT_ENV_FILE, if set
//  2. ~/.seo-agent.env, written once by the routine's setup block (the cloud
//     sandbox shell does not keep `export`s between tool calls, so a file is
//     the only thing every check can rely on)
//  3. Pete's local file on the Mac
const ENV_FILES = [
  process.env.SEO_AGENT_ENV_FILE,
  `${homedir()}/.seo-agent.env`,
  '/Users/bushrangerfilms/Documents/Claude/.env.seo-agent',
].filter(Boolean);

let loaded = false;

export function loadEnv() {
  if (loaded) return process.env;
  loaded = true;
  for (const file of ENV_FILES) {
    if (!existsSync(file)) continue;
    for (const line of readFileSync(file, 'utf8').split('\n')) {
      const m = line.match(/^(?:export\s+)?([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
      if (m && !process.env[m[1]]) {
        process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
      }
    }
  }
  return process.env;
}

loadEnv();
