import Link from "next/link";
import { Card } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          Calculadora Financeira
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Simule financiamentos e investimentos de forma simples e rápida
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Link href="/financiamento" className="group">
          <Card className="h-full transition-all hover:border-blue-500 hover:shadow-md group-hover:border-blue-500">
            <div className="flex flex-col gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50">
                <svg
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Financiamento
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Calcule a parcela fixa mensal do seu financiamento usando o
                Sistema Price. Ideal para simular empréstimos e financiamentos
                imobiliários.
              </p>
            </div>
          </Card>
        </Link>

        <Link href="/investimentos" className="group">
          <Card className="h-full transition-all hover:border-green-500 hover:shadow-md group-hover:border-green-500">
            <div className="flex flex-col gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/50">
                <svg
                  className="h-6 w-6 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                Investimentos
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Simule o crescimento dos seus investimentos ao longo do tempo
                com aportes mensais e visualize a evolução em um gráfico.
              </p>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
