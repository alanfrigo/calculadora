import { InvestimentoForm } from "@/components/calculadoras/InvestimentoForm";

export default function InvestimentosPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Calculadora de Investimentos
        </h1>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          Simule o crescimento dos seus investimentos com aportes mensais
        </p>
      </div>
      <InvestimentoForm />
    </div>
  );
}
