import Link from "next/link";
import { Card } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          Toolkit
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Coleção de ferramentas úteis para desenvolvedores
        </p>
      </div>

      {/* Calculadoras Financeiras */}
      <section>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Calculadoras Financeiras
        </h2>
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
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  Financiamento
                </h3>
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
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  Investimentos
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Simule o crescimento dos seus investimentos ao longo do tempo
                  com aportes mensais e visualize a evolução em um gráfico.
                </p>
              </div>
            </Card>
          </Link>
        </div>
      </section>

      {/* Ferramentas para Desenvolvedores */}
      <section>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Ferramentas para Desenvolvedores
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/api-key-generator" className="group">
            <Card className="h-full transition-all hover:border-purple-500 hover:shadow-md group-hover:border-purple-500">
              <div className="flex flex-col gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/50">
                  <svg
                    className="h-6 w-6 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  API Keys
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Gere chaves de API seguras com entropia criptográfica em
                  diversos formatos. Suporte para prefixos e pares chave-segredo.
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/webhook-secrets" className="group">
            <Card className="h-full transition-all hover:border-orange-500 hover:shadow-md group-hover:border-orange-500">
              <div className="flex flex-col gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/50">
                  <svg
                    className="h-6 w-6 text-orange-600 dark:text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  Webhooks
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Gere secrets para verificação de assinaturas de webhook com
                  exemplos de código em Node.js e Python.
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/uuid-generator" className="group">
            <Card className="h-full transition-all hover:border-cyan-500 hover:shadow-md group-hover:border-cyan-500">
              <div className="flex flex-col gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900/50">
                  <svg
                    className="h-6 w-6 text-cyan-600 dark:text-cyan-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  UUID
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Gere identificadores únicos universais em várias versões: v4
                  (aleatório), v7 (ordenado), v1, v3 e v5 (namespace).
                </p>
              </div>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
}
