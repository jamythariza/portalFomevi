import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoanCalculatorService {
  constructor() {}

  calculateLoan(
    loan: number,
    rate: number,
    plazo: number,
    moda: string,
    prima1: number,
    prima2: number
  ): { payment: number; totpaid: number; intpaid: number } | null {
    return this.calculateMonthlyPayment(
      loan,
      rate,
      plazo,
      moda,
      prima1,
      prima2
    );
  }

  private calculateMonthlyPayment(
    amount: number,
    apr: number,
    n: number,
    moda: string,
    prima1: number,
    prima2: number
  ): { payment: number; totpaid: number; intpaid: number } | null {
    // Sumamos las primas (por si luego se usan en el cálculo)
    const primas = (prima1 || 0) + (prima2 || 0);

    if (!amount || !apr || !n || moda !== 'vencida') {
      return null;
    }

    const rate = apr / 100; // Convertir tasa a decimal
    const tmp = Math.pow(1 + rate, -n); // (1 + i)^-n
    const tmpd = 1 - tmp; // 1 - (1 + i)^-n
    const tmpn = amount * rate; // P * i
    const payment = tmpn / tmpd; // Cuota

    if (isNaN(payment) || !isFinite(payment)) {
      return null;
    }
    return {
      payment: parseFloat(payment.toFixed(2)), // Cuota mensual
      totpaid: parseFloat((payment * n).toFixed(2)), // Total pagado
      intpaid: parseFloat((payment * n - amount).toFixed(2)), // Intereses
    };
  }
}
