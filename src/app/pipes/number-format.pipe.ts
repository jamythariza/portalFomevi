import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat',
  standalone: true,
})
export class NumberFormatPipe implements PipeTransform {
  transform(value: any, fractionDigits: number = 0): string {
    if (value === null || value === undefined || value === '') return '';

    // Si viene como string con puntos o comas, limpiar el formato
    let cleanedValue = value.toString().replace(/\./g, '').replace(',', '.');
    const numberValue = Number(cleanedValue);

    if (isNaN(numberValue)) return '';

    return new Intl.NumberFormat('es-CO', {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(numberValue);
  }
}
