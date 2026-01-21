import type {
  FinanciamentoInput,
  FinanciamentoResult,
  InvestimentoInput,
  InvestimentoResult,
  InvestimentoChartData,
} from "./types";

/**
 * Calcula a parcela fixa usando o Sistema Price
 * PMT = PV × [i × (1+i)^n] / [(1+i)^n - 1]
 */
export function calcularFinanciamento(
  input: FinanciamentoInput
): FinanciamentoResult {
  const { valorFinanciado, taxaMensal, meses } = input;

  if (valorFinanciado <= 0 || meses <= 0) {
    return { parcela: 0, totalPago: 0, totalJuros: 0 };
  }

  const i = taxaMensal / 100;

  let parcela: number;
  if (i === 0) {
    parcela = valorFinanciado / meses;
  } else {
    const fator = Math.pow(1 + i, meses);
    parcela = valorFinanciado * ((i * fator) / (fator - 1));
  }

  const totalPago = parcela * meses;
  const totalJuros = totalPago - valorFinanciado;

  return {
    parcela,
    totalPago,
    totalJuros,
  };
}

/**
 * Calcula o valor futuro de investimentos
 * FV = PV × (1+i)^n + PMT × [((1+i)^n - 1) / i]
 */
export function calcularInvestimento(
  input: InvestimentoInput
): InvestimentoResult {
  const { valorInicial, aporteMensal, taxaMensal, meses } = input;

  if (meses <= 0) {
    return { valorFinal: valorInicial, totalInvestido: valorInicial, totalJuros: 0 };
  }

  const i = taxaMensal / 100;
  const totalInvestido = valorInicial + aporteMensal * meses;

  let valorFinal: number;
  if (i === 0) {
    valorFinal = totalInvestido;
  } else {
    const fator = Math.pow(1 + i, meses);
    const valorInicialFuturo = valorInicial * fator;
    const aportesFuturos = aporteMensal * ((fator - 1) / i);
    valorFinal = valorInicialFuturo + aportesFuturos;
  }

  const totalJuros = valorFinal - totalInvestido;

  return {
    valorFinal,
    totalInvestido,
    totalJuros,
  };
}

/**
 * Gera dados para o gráfico de evolução do investimento
 */
export function gerarDadosGrafico(
  input: InvestimentoInput
): InvestimentoChartData[] {
  const { valorInicial, aporteMensal, taxaMensal, meses } = input;
  const dados: InvestimentoChartData[] = [];
  const i = taxaMensal / 100;

  for (let mes = 0; mes <= meses; mes++) {
    const totalInvestido = valorInicial + aporteMensal * mes;

    let valorAcumulado: number;
    if (mes === 0) {
      valorAcumulado = valorInicial;
    } else if (i === 0) {
      valorAcumulado = totalInvestido;
    } else {
      const fator = Math.pow(1 + i, mes);
      valorAcumulado = valorInicial * fator + aporteMensal * ((fator - 1) / i);
    }

    dados.push({
      mes,
      valorAcumulado,
      totalInvestido,
    });
  }

  return dados;
}
