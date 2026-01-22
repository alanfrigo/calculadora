"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { generateUuids, getNamespaceUuid } from "@/lib/generators";
import { UuidVersion, UuidNamespace, UuidResult, UUID_NAMESPACES } from "@/lib/types";

const versionOptions = [
  { value: "v4", label: "v4 - Aleatório (Recomendado)" },
  { value: "v7", label: "v7 - Ordenado por tempo" },
  { value: "v1", label: "v1 - Baseado em tempo" },
  { value: "v5", label: "v5 - SHA-1 (namespace + nome)" },
  { value: "v3", label: "v3 - MD5 (namespace + nome)" },
];

const namespaceOptions = [
  { value: "dns", label: "DNS" },
  { value: "url", label: "URL" },
  { value: "oid", label: "OID (ISO)" },
  { value: "x500", label: "X.500 DN" },
  { value: "custom", label: "Personalizado" },
];

const countOptions = [
  { value: "1", label: "1 UUID" },
  { value: "5", label: "5 UUIDs" },
  { value: "10", label: "10 UUIDs" },
  { value: "25", label: "25 UUIDs" },
  { value: "50", label: "50 UUIDs" },
  { value: "100", label: "100 UUIDs" },
];

export function UuidGeneratorForm() {
  const [version, setVersion] = useState<UuidVersion>("v4");
  const [namespace, setNamespace] = useState<UuidNamespace>("dns");
  const [customNamespace, setCustomNamespace] = useState("");
  const [name, setName] = useState("");
  const [count, setCount] = useState("1");
  const [result, setResult] = useState<UuidResult | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const needsNamespace = version === "v3" || version === "v5";

  const handleGenerate = async () => {
    const namespaceUuid = getNamespaceUuid(namespace, customNamespace);
    const newResult = await generateUuids({
      version,
      namespace: namespaceUuid,
      name,
      count: parseInt(count),
    });
    setResult(newResult);
  };

  const copyUuid = async (uuid: string, index: number) => {
    await navigator.clipboard.writeText(uuid);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAllUuids = async () => {
    if (result) {
      await navigator.clipboard.writeText(result.uuids.join("\n"));
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    }
  };

  const getVersionDescription = (v: UuidVersion): string => {
    switch (v) {
      case "v4":
        return "UUID completamente aleatório usando entropia criptográfica. O mais comum e seguro.";
      case "v7":
        return "UUID com timestamp no início, garantindo ordenação cronológica. Ideal para chaves primárias.";
      case "v1":
        return "UUID baseado em timestamp e identificador de nó. Contém informação temporal.";
      case "v5":
        return "UUID determinístico baseado em namespace e nome usando SHA-1. Mesmo input = mesmo UUID.";
      case "v3":
        return "UUID determinístico baseado em namespace e nome usando MD5. Prefira v5 para novos projetos.";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <div className="flex flex-col gap-4">
          <Select
            label="Versão"
            value={version}
            onChange={(v) => setVersion(v as UuidVersion)}
            options={versionOptions}
          />

          <p className="text-sm text-zinc-600 dark:text-zinc-400 -mt-2">
            {getVersionDescription(version)}
          </p>

          {needsNamespace && (
            <>
              <Select
                label="Namespace"
                value={namespace}
                onChange={(v) => setNamespace(v as UuidNamespace)}
                options={namespaceOptions}
              />

              {namespace === "custom" && (
                <Input
                  label="Namespace UUID"
                  value={customNamespace}
                  onChange={setCustomNamespace}
                  placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                />
              )}

              {namespace !== "custom" && (
                <p className="text-xs text-zinc-500 dark:text-zinc-500 -mt-2 font-mono">
                  {UUID_NAMESPACES[namespace]}
                </p>
              )}

              <Input
                label="Nome"
                value={name}
                onChange={setName}
                placeholder="ex: example.com, https://example.com"
              />
            </>
          )}

          <Select
            label="Quantidade"
            value={count}
            onChange={setCount}
            options={countOptions}
          />

          <Button onClick={handleGenerate}>Gerar UUID{parseInt(count) > 1 ? "s" : ""}</Button>
        </div>
      </Card>

      {result && (
        <Card>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                UUID{result.uuids.length > 1 ? "s" : ""} Gerado{result.uuids.length > 1 ? "s" : ""} ({result.version})
              </label>
              {result.uuids.length > 1 && (
                <button
                  onClick={copyAllUuids}
                  className="flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors"
                >
                  {copiedAll ? (
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
                      Copiar Todos
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
              {result.uuids.map((uuid, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 p-3"
                >
                  <code className="font-mono text-sm text-zinc-900 dark:text-zinc-100">
                    {uuid}
                  </code>
                  <button
                    onClick={() => copyUuid(uuid, index)}
                    className="flex-shrink-0 flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-700 transition-colors"
                  >
                    {copiedIndex === index ? (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
