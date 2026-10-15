import { createHash, createPublicKey, verify } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const [bundlePath, signaturePath, versionsPath] = process.argv.slice(2);

if (!bundlePath || !signaturePath || !versionsPath) {
  throw new Error('Usage: node verify-bundle.mjs <bundle.zip> <signature.json> <versions.json>');
}

const [bundle, signatureText, versionsText] = await Promise.all([
  readFile(bundlePath),
  readFile(signaturePath, 'utf8'),
  readFile(versionsPath, 'utf8'),
]);

const signature = JSON.parse(signatureText);
const versions = JSON.parse(versionsText);
const allowedFields = ['schema', 'keyId', 'version', 'artifact', 'size', 'sha256', 'signature'];
const actualFields = Object.keys(signature).sort();

if (JSON.stringify(actualFields) !== JSON.stringify([...allowedFields].sort())) {
  throw new Error(`Unexpected signature fields: ${actualFields.join(', ')}`);
}

if (signature.schema !== 1) throw new Error(`Unsupported signature schema: ${signature.schema}`);
if (signature.keyId !== versions.bundleSigningKeyId) throw new Error('Unexpected bundle signing key');
if (`skill-v${signature.version}` !== versions.skillTag) throw new Error('Bundle version does not match the lock');
if (signature.artifact !== versions.bundle) throw new Error('Unexpected bundle artifact name');
if (signature.size !== bundle.length) throw new Error('Bundle size does not match signed metadata');

const digest = createHash('sha256').update(bundle).digest('hex');
if (digest !== signature.sha256) throw new Error('Bundle SHA-256 does not match signed metadata');

const payload = [
  'impeccable-skill-bundle-v1',
  signature.keyId,
  `skill-v${signature.version}`,
  signature.artifact,
  String(signature.size),
  signature.sha256,
  '',
].join('\n');

const rawKey = Buffer.from(versions.bundleSigningPublicKeyHex, 'hex');
const spkiPrefix = Buffer.from('302a300506032b6570032100', 'hex');
const publicKey = createPublicKey({
  key: Buffer.concat([spkiPrefix, rawKey]),
  format: 'der',
  type: 'spki',
});

const valid = verify(null, Buffer.from(payload, 'utf8'), publicKey, Buffer.from(signature.signature, 'hex'));
if (!valid) throw new Error('Bundle Ed25519 signature verification failed');

process.stdout.write(JSON.stringify({
  verified: true,
  skillTag: versions.skillTag,
  artifact: signature.artifact,
  size: signature.size,
  sha256: signature.sha256,
  keyId: signature.keyId,
}, null, 2));
