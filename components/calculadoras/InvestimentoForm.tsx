"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { InvestimentoChart } from "./InvestimentoChart";
import { calcularInvestimento, gerarDadosGrafico } from "@/lib/calculations";
import { formatCurrency } from "@/lib/formatters";
import type { InvestimentoResult, InvestimentoChartData } from "@/lib/types";

export function InvestimentoForm() {
  const [valorInicial, setValorInicial] = useState("");
  const [aporteMensal, setAporteMensal] = useState("");
  const [taxaMensal, setTaxaMensal] = useState("");
  const [meses, setMeses] = useState("");
  const [resultado, setResultado] = useState<InvestimentoResult | null>(null);
  const [dadosGrafico, setDadosGrafico] = useState<InvestimentoChartData[]>([]);

  const handleCalcular = () => {
    const input = {
      valorInicial: parseFloat(valorInicial) || 0,
      aporteMensal: parseFloat(aporteMensal) || 0,
      taxaMensal: parseFloat(taxaMensal) || 0,
      meses: parseInt(meses) || 0,
    };
    const result = calcularInvestimento(input);
    const dados = gerarDadosGrafico(input);
    setResultado(result);
    setDadosGrafico(dados);
  };

  const handleLimpar = () => {
    setValorInicial("");
    setAporteMensal("");
    setTaxaMensal("");
    setMeses("");
    setResultado(null);
    setDadosGrafico([]);
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Dados do Investimento
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Valor Inicial"
              value={valorInicial}
              onChange={setValorInicial}
              prefix="R$"
              type="number"
              placeholder="1000"
            />
            <Input
              label="Aporte Mensal"
              value={aporteMensal}
              onChange={setAporteMensal}
              prefix="R$"
              type="number"
              placeholder="500"
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
              placeholder="24"
            />
          </div>
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

      {resultado && resultado.valorFinal > 0 && (
        <>
          <Card>
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Resultado
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Valor Final
                  </p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(resultado.valorFinal)}
                  </p>
                </div>
                <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Total Investido
                  </p>
                  <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                    {formatCurrency(resultado.totalInvestido)}
                  </p>
                </div>
                <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Rendimento
                  </p>
                  <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {formatCurrency(resultado.totalJuros)}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Evolução do Investimento
              </h2>
              <InvestimentoChart data={dadosGrafico} />
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
