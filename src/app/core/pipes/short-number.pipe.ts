import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortNumber'
})
export class ShortNumberPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    if (value === null) { return null; }
    if (value === 0) { return '0'; }
    const fractionSize = 1;
    let abs = Math.abs(value);
    const rounder = Math.pow(10, fractionSize);
    const isNegative = value < 0;
    let key = '';
    const powers = [
      { key: 'Q', value: Math.pow(10, 15) },
      { key: 'T', value: Math.pow(10, 12) },
      { key: 'B', value: Math.pow(10, 9) },
      { key: 'M', value: Math.pow(10, 6) },
      { key: 'k', value: 1000 }];

    for (const power of powers) {
      let reduced = abs / power.value;
      reduced = Math.round(reduced * rounder) / rounder;
      if (reduced >= 1) {
        abs = reduced;
        key = power.key;
        break;
      }
    }
    return (isNegative ? '-' : '') + abs + key;
  }
}
