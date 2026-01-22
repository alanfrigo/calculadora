import { ApiKeyGeneratorForm } from "@/components/generators/ApiKeyGeneratorForm";

export default function ApiKeyGeneratorPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Gerador de API Keys
        </h1>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          Gere chaves de API seguras com entropia criptográfica
        </p>
      </div>
      <ApiKeyGeneratorForm />
    </div>
  );
}
