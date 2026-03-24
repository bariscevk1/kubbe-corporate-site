/**
 * Varsayılan yerel sunucu: Sanity istekleri atlanır, basit dil modu.
 * Tarayıcı: http://127.0.0.1:3000/ veya http://127.0.0.1:3000/tr
 */
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
process.env.SKIP_SANITY_IN_DEV = '1';
process.env.NEXT_PUBLIC_DEV_SIMPLE_ROUTES = '1';

const nextCli = join(root, 'node_modules', 'next', 'dist', 'bin', 'next');

const child = spawn(process.execPath, [nextCli, 'dev', '-p', '3000', '-H', '127.0.0.1'], {
  stdio: 'inherit',
  cwd: root,
  env: { ...process.env },
});

child.on('exit', (code) => process.exit(code ?? 0));
