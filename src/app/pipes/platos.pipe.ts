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
@Pipe({name: 'PlatosCategoria'})
export class PlatoPipe implements PipeTransform {
    transform(platos: interPlato[], idCategoria:string): interPlato[] {
        if (platos.length === 0) return [];
        if (!idCategoria) return platos;
        return platos.filter((e) => e.idCategoria === Number(idCategoria));
    }
}