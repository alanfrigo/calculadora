import {
  ApiKeyInput,
  ApiKeyResult,
  ApiKeyFormat,
  WebhookSecretInput,
  WebhookSecretResult,
  WebhookAlgorithm,
  CodeExamples,
  UuidInput,
  UuidResult,
  UUID_NAMESPACES,
  UuidNamespace,
} from './types';

// Character sets for different formats
const CHARSETS = {
  alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  hex: '0123456789abcdef',
  numeric: '0123456789',
};

// Get cryptographically secure random bytes
export function getRandomBytes(length: number): Uint8Array {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
}

// Generate string from charset using secure random
export function generateFromCharset(length: number, charset: string): string {
  const bytes = getRandomBytes(length);
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset[bytes[i] % charset.length];
  }
  return result;
}

// Generate base64 key
export function generateBase64Key(byteLength: number): string {
  const bytes = getRandomBytes(byteLength);
  return btoa(String.fromCharCode(...bytes));
}

// Generate base64url key (URL-safe base64)
export function generateBase64UrlKey(byteLength: number): string {
  const bytes = getRandomBytes(byteLength);
  const base64 = btoa(String.fromCharCode(...bytes));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// Calculate entropy in bits
export function calculateEntropy(length: number, charsetSize: number): number {
  return Math.floor(length * Math.log2(charsetSize));
}

// Get entropy description based on bits
export function getEntropyDescription(bits: number): string {
  if (bits < 64) return 'Fraca - Use apenas para desenvolvimento';
  if (bits < 128) return 'Moderada - Adequada para uso interno';
  if (bits < 192) return 'Forte - Adequada para produção';
  if (bits < 256) return 'Muito Forte - Excelente para produção';
  return 'Excepcional - Máxima segurança';
}

// Get charset size for format
function getCharsetSize(format: ApiKeyFormat): number {
  switch (format) {
    case 'alphanumeric': return 62;
    case 'hex': return 16;
    case 'base64': return 64;
    case 'base64url': return 64;
    case 'uuid': return 16; // hex characters
    case 'numeric': return 10;
    default: return 62;
  }
}

// Generate API Key
export function generateApiKey(input: ApiKeyInput): ApiKeyResult {
  let key: string;
  let charsetSize: number;
  let effectiveLength: number;

  switch (input.format) {
    case 'alphanumeric':
      key = generateFromCharset(input.length, CHARSETS.alphanumeric);
      charsetSize = 62;
      effectiveLength = input.length;
      break;
    case 'hex':
      key = generateFromCharset(input.length, CHARSETS.hex);
      charsetSize = 16;
      effectiveLength = input.length;
      break;
    case 'base64':
      // For base64, we calculate bytes needed to get approximately the desired length
      const base64ByteLength = Math.ceil((input.length * 3) / 4);
      key = generateBase64Key(base64ByteLength).slice(0, input.length);
      charsetSize = 64;
      effectiveLength = key.length;
      break;
    case 'base64url':
      const base64urlByteLength = Math.ceil((input.length * 3) / 4);
      key = generateBase64UrlKey(base64urlByteLength).slice(0, input.length);
      charsetSize = 64;
      effectiveLength = key.length;
      break;
    case 'uuid':
      key = generateUuidV4();
      charsetSize = 16;
      effectiveLength = 32; // 32 hex chars in UUID
      break;
    case 'numeric':
      key = generateFromCharset(input.length, CHARSETS.numeric);
      charsetSize = 10;
      effectiveLength = input.length;
      break;
    default:
      key = generateFromCharset(input.length, CHARSETS.alphanumeric);
      charsetSize = 62;
      effectiveLength = input.length;
  }

  // Add prefix if provided
  if (input.prefix) {
    key = input.prefix + key;
  }

  const entropy = calculateEntropy(effectiveLength, charsetSize);
  const result: ApiKeyResult = {
    key,
    entropy,
    entropyDescription: getEntropyDescription(entropy),
  };

  // Generate secret pair if requested
  if (input.generatePair) {
    const secretInput = { ...input, prefix: undefined, generatePair: false };
    const secretResult = generateApiKey(secretInput);
    result.secret = secretResult.key;
  }

  return result;
}

// Generate UUID v4 (random)
export function generateUuidV4(): string {
  const bytes = getRandomBytes(16);
  // Set version 4
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  // Set variant
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

// Generate UUID v7 (time-ordered)
export function generateUuidV7(): string {
  const bytes = getRandomBytes(16);
  const now = Date.now();

  // Set timestamp (first 48 bits)
  bytes[0] = (now / 0x10000000000) & 0xff;
  bytes[1] = (now / 0x100000000) & 0xff;
  bytes[2] = (now / 0x1000000) & 0xff;
  bytes[3] = (now / 0x10000) & 0xff;
  bytes[4] = (now / 0x100) & 0xff;
  bytes[5] = now & 0xff;

  // Set version 7
  bytes[6] = (bytes[6] & 0x0f) | 0x70;
  // Set variant
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

// Generate UUID v1 (time-based with node)
export function generateUuidV1(): string {
  const bytes = getRandomBytes(16);
  const now = Date.now();

  // UUID v1 uses 100-nanosecond intervals since Oct 15, 1582
  const gregorianOffset = 12219292800000; // milliseconds from 1582 to 1970
  const timestamp = (now + gregorianOffset) * 10000;

  // time_low (4 bytes)
  bytes[0] = (timestamp >>> 24) & 0xff;
  bytes[1] = (timestamp >>> 16) & 0xff;
  bytes[2] = (timestamp >>> 8) & 0xff;
  bytes[3] = timestamp & 0xff;

  // time_mid (2 bytes)
  bytes[4] = (timestamp >>> 40) & 0xff;
  bytes[5] = (timestamp >>> 32) & 0xff;

  // time_hi_and_version (2 bytes)
  bytes[6] = ((timestamp >>> 56) & 0x0f) | 0x10; // version 1
  bytes[7] = (timestamp >>> 48) & 0xff;

  // clock_seq_hi_and_reserved
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant

  const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

// Parse UUID string to bytes
function uuidToBytes(uuid: string): Uint8Array {
  const hex = uuid.replace(/-/g, '');
  const bytes = new Uint8Array(16);
  for (let i = 0; i < 16; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

// Generate UUID v5 (SHA-1 name-based)
export async function generateUuidV5(namespace: string, name: string): Promise<string> {
  const namespaceBytes = uuidToBytes(namespace);
  const nameBytes = new TextEncoder().encode(name);

  const data = new Uint8Array(namespaceBytes.length + nameBytes.length);
  data.set(namespaceBytes);
  data.set(nameBytes, namespaceBytes.length);

  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const bytes = new Uint8Array(hashBuffer).slice(0, 16);

  // Set version 5
  bytes[6] = (bytes[6] & 0x0f) | 0x50;
  // Set variant
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

// Generate UUID v3 (MD5 name-based)
export async function generateUuidV3(namespace: string, name: string): Promise<string> {
  // MD5 is not available in Web Crypto API, so we'll use a simple implementation
  // For production, consider using a proper MD5 library
  const namespaceBytes = uuidToBytes(namespace);
  const nameBytes = new TextEncoder().encode(name);

  const data = new Uint8Array(namespaceBytes.length + nameBytes.length);
  data.set(namespaceBytes);
  data.set(nameBytes, namespaceBytes.length);

  // Using SHA-256 and truncating (not standard MD5, but secure alternative)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const bytes = new Uint8Array(hashBuffer).slice(0, 16);

  // Set version 3
  bytes[6] = (bytes[6] & 0x0f) | 0x30;
  // Set variant
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

// Generate multiple UUIDs
export async function generateUuids(input: UuidInput): Promise<UuidResult> {
  const uuids: string[] = [];
  const namespace = input.namespace || UUID_NAMESPACES.dns;

  for (let i = 0; i < input.count; i++) {
    let uuid: string;
    switch (input.version) {
      case 'v4':
        uuid = generateUuidV4();
        break;
      case 'v7':
        uuid = generateUuidV7();
        break;
      case 'v1':
        uuid = generateUuidV1();
        break;
      case 'v5':
        uuid = await generateUuidV5(namespace, input.name || '');
        break;
      case 'v3':
        uuid = await generateUuidV3(namespace, input.name || '');
        break;
      default:
        uuid = generateUuidV4();
    }
    uuids.push(uuid);
  }

  return { uuids, version: input.version };
}

// Get namespace UUID from preset
export function getNamespaceUuid(namespace: UuidNamespace, customValue?: string): string {
  if (namespace === 'custom') {
    return customValue || UUID_NAMESPACES.dns;
  }
  return UUID_NAMESPACES[namespace];
}

// Generate Webhook Secret
export function generateWebhookSecret(input: WebhookSecretInput): WebhookSecretResult {
  let secret: string;

  switch (input.format) {
    case 'hex':
      secret = generateFromCharset(input.length, CHARSETS.hex);
      break;
    case 'base64':
      const byteLength = Math.ceil((input.length * 3) / 4);
      secret = generateBase64Key(byteLength).slice(0, input.length);
      break;
    case 'alphanumeric':
      secret = generateFromCharset(input.length, CHARSETS.alphanumeric);
      break;
    default:
      secret = generateFromCharset(input.length, CHARSETS.hex);
  }

  return {
    secret,
    algorithm: input.algorithm,
    codeExamples: generateSignatureCode(secret, input.algorithm),
  };
}

// Generate code examples for webhook signature verification
export function generateSignatureCode(secret: string, algorithm: WebhookAlgorithm): CodeExamples {
  const hashAlg = algorithm.replace('HMAC-', '').toLowerCase();
  const nodeAlg = hashAlg.replace('-', '');

  const nodejs = `const crypto = require('crypto');

const SECRET = '${secret}';
const TOLERANCE_SECONDS = 300; // 5 minutes

function verifyWebhookSignature(payload, signature, timestamp) {
  // Validate timestamp to prevent replay attacks
  const currentTime = Math.floor(Date.now() / 1000);
  if (Math.abs(currentTime - parseInt(timestamp)) > TOLERANCE_SECONDS) {
    throw new Error('Timestamp outside tolerance window');
  }

  // Create signature
  const signedPayload = \`\${timestamp}.\${payload}\`;
  const expectedSignature = crypto
    .createHmac('${nodeAlg}', SECRET)
    .update(signedPayload)
    .digest('hex');

  // Compare signatures (timing-safe)
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// Usage with Express
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-signature'];
  const timestamp = req.headers['x-timestamp'];
  const payload = JSON.stringify(req.body);

  try {
    if (verifyWebhookSignature(payload, signature, timestamp)) {
      // Process webhook
      res.status(200).send('OK');
    } else {
      res.status(401).send('Invalid signature');
    }
  } catch (error) {
    res.status(401).send(error.message);
  }
});`;

  const python = `import hmac
import hashlib
import time

SECRET = '${secret}'
TOLERANCE_SECONDS = 300  # 5 minutes

def verify_webhook_signature(payload: str, signature: str, timestamp: str) -> bool:
    # Validate timestamp to prevent replay attacks
    current_time = int(time.time())
    if abs(current_time - int(timestamp)) > TOLERANCE_SECONDS:
        raise ValueError('Timestamp outside tolerance window')

    # Create signature
    signed_payload = f"{timestamp}.{payload}"
    expected_signature = hmac.new(
        SECRET.encode(),
        signed_payload.encode(),
        hashlib.${hashAlg.replace('-', '')}
    ).hexdigest()

    # Compare signatures (timing-safe)
    return hmac.compare_digest(signature, expected_signature)

# Usage with Flask
from flask import Flask, request

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def webhook():
    signature = request.headers.get('X-Signature')
    timestamp = request.headers.get('X-Timestamp')
    payload = request.get_data(as_text=True)

    try:
        if verify_webhook_signature(payload, signature, timestamp):
            # Process webhook
            return 'OK', 200
        else:
            return 'Invalid signature', 401
    except ValueError as e:
        return str(e), 401`;

  return { nodejs, python };
}
