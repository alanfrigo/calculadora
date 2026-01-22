"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { CodeBlock } from "./CodeBlock";
import { generateWebhookSecret } from "@/lib/generators";
import { WebhookAlgorithm, WebhookFormat, WebhookSecretResult } from "@/lib/types";

const algorithmOptions = [
  { value: "HMAC-SHA256", label: "HMAC-SHA256 (Recomendado)" },
  { value: "HMAC-SHA384", label: "HMAC-SHA384" },
  { value: "HMAC-SHA512", label: "HMAC-SHA512" },
];

const formatOptions = [
  { value: "hex", label: "Hexadecimal" },
  { value: "base64", label: "Base64" },
  { value: "alphanumeric", label: "Alfanumérico" },
];

const lengthOptions = [
  { value: "16", label: "16 caracteres" },
  { value: "32", label: "32 caracteres (Recomendado)" },
  { value: "48", label: "48 caracteres" },
  { value: "64", label: "64 caracteres" },
];

export function WebhookSecretsForm() {
  const [algorithm, setAlgorithm] = useState<WebhookAlgorithm>("HMAC-SHA256");
  const [format, setFormat] = useState<WebhookFormat>("hex");
  const [length, setLength] = useState("32");
  const [result, setResult] = useState<WebhookSecretResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"nodejs" | "python">("nodejs");

  const handleGenerate = () => {
    const newResult = generateWebhookSecret({
      algorithm,
      format,
      length: parseInt(length),
    });
    setResult(newResult);
  };

  const copySecret = async () => {
    if (result) {
      await navigator.clipboard.writeText(result.secret);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <div className="flex flex-col gap-4">
          <Select
            label="Algoritmo"
            value={algorithm}
            onChange={(v) => setAlgorithm(v as WebhookAlgorithm)}
            options={algorithmOptions}
          />

          <Select
            label="Formato"
            value={format}
            onChange={(v) => setFormat(v as WebhookFormat)}
            options={formatOptions}
          />

          <Select
            label="Comprimento"
            value={length}
            onChange={setLength}
            options={lengthOptions}
          />

          <Button onClick={handleGenerate}>Gerar Webhook Secret</Button>
        </div>
      </Card>

      {result && (
        <>
          <Card>
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Webhook Secret
                  </label>
                  <button
                    onClick={copySecret}
                    className="flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors"
                  >
                    {copied ? (
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

              <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Algoritmo: {result.algorithm}</span>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  Verificação de Assinatura
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Código de exemplo para verificar assinaturas de webhook com proteção contra replay attacks.
                </p>
              </div>

              <div className="flex gap-2 border-b border-zinc-200 dark:border-zinc-700">
                <button
                  onClick={() => setActiveTab("nodejs")}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === "nodejs"
                      ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  }`}
                >
                  Node.js
                </button>
                <button
                  onClick={() => setActiveTab("python")}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === "python"
                      ? "border-b-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  }`}
                >
                  Python
                </button>
              </div>

              {activeTab === "nodejs" && (
                <CodeBlock
                  code={result.codeExamples.nodejs}
                  language="javascript"
                  title="Node.js / Express"
                />
              )}

              {activeTab === "python" && (
                <CodeBlock
                  code={result.codeExamples.python}
                  language="python"
                  title="Python / Flask"
                />
              )}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
