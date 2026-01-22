"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { generateApiKey } from "@/lib/generators";
import { ApiKeyFormat, ApiKeyResult } from "@/lib/types";

const formatOptions = [
  { value: "alphanumeric", label: "Alfanumérico (A-Za-z0-9)" },
  { value: "hex", label: "Hexadecimal (0-9a-f)" },
  { value: "base64", label: "Base64" },
  { value: "base64url", label: "Base64 URL-safe" },
  { value: "uuid", label: "UUID v4" },
  { value: "numeric", label: "Numérico (0-9)" },
];

export function ApiKeyGeneratorForm() {
  const [format, setFormat] = useState<ApiKeyFormat>("alphanumeric");
  const [length, setLength] = useState("32");
  const [prefix, setPrefix] = useState("");
  const [generatePair, setGeneratePair] = useState(false);
  const [result, setResult] = useState<ApiKeyResult | null>(null);
  const [copied, setCopied] = useState<"key" | "secret" | null>(null);

  const handleGenerate = () => {
    const lengthNum = parseInt(length) || 32;
    const clampedLength = Math.min(Math.max(lengthNum, 8), 256);

    const newResult = generateApiKey({
      format,
      length: clampedLength,
      prefix: prefix || undefined,
      generatePair,
    });
    setResult(newResult);
  };

  const copyToClipboard = async (text: string, type: "key" | "secret") => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const isUuidFormat = format === "uuid";

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <div className="flex flex-col gap-4">
          <Select
            label="Formato"
            value={format}
            onChange={(v) => setFormat(v as ApiKeyFormat)}
            options={formatOptions}
          />

          {!isUuidFormat && (
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Comprimento: {length} caracteres
              </label>
              <input
                type="range"
                min="8"
                max="256"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer dark:bg-zinc-700"
              />
              <div className="flex justify-between text-xs text-zinc-500">
                <span>8</span>
                <span>256</span>
              </div>
            </div>
          )}

          <Input
            label="Prefixo (opcional)"
            value={prefix}
            onChange={setPrefix}
            placeholder="ex: sk_, pk_, api_"
          />

          <Checkbox
            label="Gerar par chave-segredo"
            checked={generatePair}
            onChange={setGeneratePair}
          />

          <Button onClick={handleGenerate}>Gerar API Key</Button>
        </div>
      </Card>

      {result && (
        <Card>
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {result.secret ? "Chave Pública" : "API Key"}
                </label>
                <button
                  onClick={() => copyToClipboard(result.key, "key")}
                  className="flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors"
                >
                  {copied === "key" ? (
                    <>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copiado
                    </>
                  ) : (
                    <>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copiar
                    </>
                  )}
                </button>
              </div>
              <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800 p-3 font-mono text-sm break-all">
                {result.key}
              </div>
            </div>

            {result.secret && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Chave Secreta
                  </label>
                  <button
                    onClick={() => copyToClipboard(result.secret!, "secret")}
                    className="flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors"
                  >
                    {copied === "secret" ? (
                      <>
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copiado
                      </>
                    ) : (
                      <>
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copiar
                      </>
                    )}
                  </button>
                </div>
                <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800 p-3 font-mono text-sm break-all">
                  {result.secret}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 pt-2 border-t border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  {result.entropy} bits de entropia
                </span>
              </div>
              <span className="text-sm text-zinc-500">•</span>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {result.entropyDescription}
              </span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
