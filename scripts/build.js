import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const srcDir = path.join(rootDir, 'src');
const publicDir = path.join(rootDir, 'public');

async function removeDir(dir) {
  try {
    await fs.rm(dir, { recursive: true, force: true });
  } catch (error) {
    console.error('Failed to clean dist directory', error);
  }
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function copyFileWithExtension(source, target, newExt) {
  let content = await fs.readFile(source, 'utf8');
  content = content
    .replace(/from\s+['"](\.\.?\/[^'"]+)\.ts['"]/g, (match, p1) => `from "${p1}.js"`)
    .replace(/import\s*\(\s*['"](\.\.?\/[^'"]+)\.ts['"]\s*\)/g, (match, p1) => `import("${p1}.js")`)
    .replace(/require\(\s*['"](\.\.?\/[^'"]+)\.ts['"]\s*\)/g, (match, p1) => `require("${p1}.js")`);
  const targetFile = target.replace(/\.ts$/, newExt);
  await ensureDir(path.dirname(targetFile));
  await fs.writeFile(targetFile, content, 'utf8');
}

async function copyDir(source, target) {
  const entries = await fs.readdir(source, { withFileTypes: true });
  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);
    if (entry.isDirectory()) {
      await copyDir(sourcePath, targetPath);
    } else {
      await ensureDir(path.dirname(targetPath));
      await fs.copyFile(sourcePath, targetPath);
    }
  }
}

async function buildSource() {
  const serverSource = path.join(srcDir, 'server');
  const clientSource = path.join(srcDir, 'client');
  const serverTarget = path.join(distDir, 'server');
  const clientTarget = path.join(distDir, 'public', 'assets');

  await ensureDir(serverTarget);
  await ensureDir(clientTarget);

  async function processTsDirectory(sourceDir, targetDir) {
    const entries = await fs.readdir(sourceDir, { withFileTypes: true });
    for (const entry of entries) {
      const sourcePath = path.join(sourceDir, entry.name);
      const targetPath = path.join(targetDir, entry.name);
      if (entry.isDirectory()) {
        await processTsDirectory(sourcePath, targetPath);
      } else if (entry.isFile() && entry.name.endsWith('.ts')) {
        await copyFileWithExtension(sourcePath, targetPath, '.js');
      } else if (entry.isFile()) {
        await ensureDir(path.dirname(targetPath));
        await fs.copyFile(sourcePath, targetPath);
      }
    }
  }

  await processTsDirectory(serverSource, serverTarget);
  await processTsDirectory(clientSource, clientTarget);
}

async function buildPublic() {
  const targetDir = path.join(distDir, 'public');
  await ensureDir(targetDir);
  await copyDir(publicDir, targetDir);
}

async function prepareStorage() {
  const distStorage = path.join(distDir, 'storage');
  await ensureDir(distStorage);
  const originalStorage = path.join(rootDir, 'storage');
  try {
    await copyDir(originalStorage, distStorage);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await ensureDir(originalStorage);
      await fs.writeFile(path.join(originalStorage, 'leads.json'), '[]', 'utf8');
      await fs.writeFile(path.join(originalStorage, 'contacts.json'), '[]', 'utf8');
      await copyDir(originalStorage, distStorage);
    } else {
      throw error;
    }
  }
}

export async function build() {
  await removeDir(distDir);
  await ensureDir(distDir);
  await Promise.all([
    buildSource(),
    buildPublic(),
    prepareStorage()
  ]);
}

if (import.meta.url === `file://${__filename}`) {
  build().catch((error) => {
    console.error('Build failed', error);
    process.exit(1);
  });
}
