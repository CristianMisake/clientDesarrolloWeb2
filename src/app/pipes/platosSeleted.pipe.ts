import { Pipe, PipeTransform } from '@angular/core';
//categorias
import { interPlato } from '../interfaces/interService';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'PlatosSeleted'})
export class PlatoSeletedPipe implements PipeTransform {
    transform(platos: interPlato[]): number {
        return platos.filter(e => e.seleted).length;
    }
}