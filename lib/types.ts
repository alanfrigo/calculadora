export interface FinanciamentoInput {
  valorFinanciado: number;
  taxaMensal: number;
  meses: number;
}

export interface FinanciamentoResult {
  parcela: number;
  totalPago: number;
  totalJuros: number;
}

export interface InvestimentoInput {
  valorInicial: number;
  aporteMensal: number;
  taxaMensal: number;
  meses: number;
}

export interface InvestimentoResult {
  valorFinal: number;
  totalInvestido: number;
  totalJuros: number;
}

export interface InvestimentoChartData {
  mes: number;
  valorAcumulado: number;
  totalInvestido: number;
}
