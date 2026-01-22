import { UuidGeneratorForm } from "@/components/generators/UuidGeneratorForm";

export default function UuidGeneratorPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Gerador de UUID
        </h1>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          Gere identificadores únicos universais em diferentes versões
        </p>
      </div>
      <UuidGeneratorForm />
    </div>
  );
}
