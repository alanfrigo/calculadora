import { FinanciamentoForm } from "@/components/calculadoras/FinanciamentoForm";

export default function FinanciamentoPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Calculadora de Financiamento
        </h1>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          Calcule a parcela mensal fixa usando o Sistema Price (Tabela Price)
        </p>
      </div>
      <FinanciamentoForm />
    </div>
  );
}
