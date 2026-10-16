import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const lockPath = new URL('./versions.json', import.meta.url);
const lock = JSON.parse(await readFile(lockPath, 'utf8'));
const results = [];

for (const [path, expectedBlobSha] of Object.entries(lock.files)) {
  const url = `https://raw.githubusercontent.com/emilkowalski/skills/${lock.commit}/${path}`;
  const response = await fetch(url, { redirect: 'follow' });
  if (!response.ok) throw new Error(`Unable to fetch ${path}: HTTP ${response.status}`);
  const body = Buffer.from(await response.arrayBuffer());
  const header = Buffer.from(`blob ${body.length}\0`);
  const actualBlobSha = createHash('sha1').update(header).update(body).digest('hex');
  if (actualBlobSha !== expectedBlobSha) {
    throw new Error(`${path}: expected ${expectedBlobSha}, received ${actualBlobSha}`);
  }
  results.push({ path, bytes: body.length, blobSha: actualBlobSha, verified: true });
}

process.stdout.write(`${JSON.stringify({
  upstream: lock.upstream,
  commit: lock.commit,
  author: lock.author,
  license: lock.license,
  verifiedFiles: results,
}, null, 2)}\n`);
