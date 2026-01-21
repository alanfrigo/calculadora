"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatCurrency } from "@/lib/formatters";
import type { InvestimentoChartData } from "@/lib/types";

interface InvestimentoChartProps {
  data: InvestimentoChartData[];
}

export function InvestimentoChart({ data }: InvestimentoChartProps) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorInvestido" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-700" />
          <XAxis
            dataKey="mes"
            className="text-xs"
            tick={{ fill: "#71717a" }}
            tickFormatter={(value) => `${value}m`}
          />
          <YAxis
            className="text-xs"
            tick={{ fill: "#71717a" }}
            tickFormatter={(value) =>
              value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value.toString()
            }
          />
          <Tooltip
            formatter={(value, name) => [
              formatCurrency(Number(value) || 0),
              name === "valorAcumulado" ? "Valor Total" : "Total Investido",
            ]}
            labelFormatter={(label) => `Mês ${label}`}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "1px solid #e4e4e7",
              borderRadius: "8px",
            }}
          />
          <Legend
            formatter={(value) =>
              value === "valorAcumulado" ? "Valor Total" : "Total Investido"
            }
          />
          <Area
            type="monotone"
            dataKey="totalInvestido"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#colorInvestido)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="valorAcumulado"
            stroke="#22c55e"
            fillOpacity={1}
            fill="url(#colorValor)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
