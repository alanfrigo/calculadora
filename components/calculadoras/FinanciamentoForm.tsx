"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { calcularFinanciamento } from "@/lib/calculations";
import { formatCurrency } from "@/lib/formatters";
import type { FinanciamentoResult } from "@/lib/types";

export function FinanciamentoForm() {
  const [valorFinanciado, setValorFinanciado] = useState("");
  const [taxaMensal, setTaxaMensal] = useState("");
  const [meses, setMeses] = useState("");
  const [resultado, setResultado] = useState<FinanciamentoResult | null>(null);

  const handleCalcular = () => {
    const result = calcularFinanciamento({
      valorFinanciado: parseFloat(valorFinanciado) || 0,
      taxaMensal: parseFloat(taxaMensal) || 0,
      meses: parseInt(meses) || 0,
    });
    setResultado(result);
  };

  const handleLimpar = () => {
    setValorFinanciado("");
    setTaxaMensal("");
    setMeses("");
    setResultado(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Dados do Financiamento
          </h2>
          <Input
            label="Valor Financiado"
            value={valorFinanciado}
            onChange={setValorFinanciado}
            prefix="R$"
            type="number"
            placeholder="100000"
          />
          <Input
            label="Taxa de Juros Mensal"
            value={taxaMensal}
            onChange={setTaxaMensal}
            suffix="%"
            type="number"
            placeholder="1"
          />
          <Input
            label="Prazo (meses)"
            value={meses}
            onChange={setMeses}
            type="number"
            placeholder="12"
          />
          <div className="flex gap-3 pt-2">
            <Button onClick={handleCalcular} className="flex-1">
              Calcular
            </Button>
            <Button onClick={handleLimpar} variant="secondary">
              Limpar
            </Button>
          </div>
        </div>
      </Card>

      {resultado && resultado.parcela > 0 && (
        <Card>
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Resultado
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Parcela Mensal
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(resultado.parcela)}
                </p>
              </div>
              <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Total a Pagar
                </p>
                <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  {formatCurrency(resultado.totalPago)}
                </p>
              </div>
              <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Total de Juros
                </p>
                <p className="text-xl font-semibold text-red-600 dark:text-red-400">
                  {formatCurrency(resultado.totalJuros)}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
