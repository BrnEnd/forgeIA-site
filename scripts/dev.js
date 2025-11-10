import { spawn } from 'node:child_process';
import { watch } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from './build.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const publicDir = path.join(rootDir, 'public');

let serverProcess = null;
let isBuilding = false;
let rebuildQueued = false;

function startServer() {
  if (serverProcess) {
    serverProcess.kill();
  }
  serverProcess = spawn('node', ['--watch', path.join('dist', 'server', 'index.js')], {
    stdio: 'inherit',
    cwd: rootDir
  });
}

async function runBuild() {
  if (isBuilding) {
    rebuildQueued = true;
    return;
  }
  isBuilding = true;
  try {
    await build();
    startServer();
  } catch (error) {
    console.error('Build failed', error);
  } finally {
    isBuilding = false;
    if (rebuildQueued) {
      rebuildQueued = false;
      runBuild();
    }
  }
}

function watchDirectory(dir) {
  watch(dir, { recursive: true }, () => {
    runBuild();
  });
}

await runBuild();
watchDirectory(srcDir);
watchDirectory(publicDir);

process.on('SIGINT', () => {
  if (serverProcess) {
    serverProcess.kill();
  }
  process.exit(0);
});
