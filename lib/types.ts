export interface FinanciamentoInput {
  valorFinanciado: number;
  taxaMensal: number;
  meses: number;
}

export interface FinanciamentoResult {
  parcela: number;
  totalPago: number;
  totalJuros: number;
}

export interface InvestimentoInput {
  valorInicial: number;
  aporteMensal: number;
  taxaMensal: number;
  meses: number;
}

export interface InvestimentoResult {
  valorFinal: number;
  totalInvestido: number;
  totalJuros: number;
}

export interface InvestimentoChartData {
  mes: number;
  valorAcumulado: number;
  totalInvestido: number;
}

// API Key Generator Types
export type ApiKeyFormat = 'alphanumeric' | 'hex' | 'base64' | 'base64url' | 'uuid' | 'numeric';

export interface ApiKeyInput {
  format: ApiKeyFormat;
  length: number;
  prefix?: string;
  generatePair?: boolean;
}

export interface ApiKeyResult {
  key: string;
  secret?: string;
  entropy: number;
  entropyDescription: string;
}

// Webhook Secrets Types
export type WebhookAlgorithm = 'HMAC-SHA256' | 'HMAC-SHA384' | 'HMAC-SHA512';
export type WebhookFormat = 'hex' | 'base64' | 'alphanumeric';

export interface WebhookSecretInput {
  algorithm: WebhookAlgorithm;
  format: WebhookFormat;
  length: number;
}

export interface WebhookSecretResult {
  secret: string;
  algorithm: WebhookAlgorithm;
  codeExamples: CodeExamples;
}

export interface CodeExamples {
  nodejs: string;
  python: string;
}

// UUID Generator Types
export type UuidVersion = 'v4' | 'v7' | 'v1' | 'v5' | 'v3';
export type UuidNamespace = 'dns' | 'url' | 'oid' | 'x500' | 'custom';

export const UUID_NAMESPACES: Record<Exclude<UuidNamespace, 'custom'>, string> = {
  dns: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
  url: '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
  oid: '6ba7b812-9dad-11d1-80b4-00c04fd430c8',
  x500: '6ba7b814-9dad-11d1-80b4-00c04fd430c8',
};

export interface UuidInput {
  version: UuidVersion;
  namespace?: string;
  name?: string;
  count: number;
}

export interface UuidResult {
  uuids: string[];
  version: UuidVersion;
}
