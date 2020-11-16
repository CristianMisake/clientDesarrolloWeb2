import { Pipe, PipeTransform } from '@angular/core';
//categorias
import { interCategoria } from '../interfaces/interService';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'CategoriaName'})
export class CategoriaPipe implements PipeTransform {
    transform(idCategoria: number, categorias:interCategoria[]): string {
        //return `${idCategoria}`
        const categoria = categorias.filter((e) => e.id === idCategoria);
        if (categoria.length === 0) return '';
        return categoria[0].nombre;
    }
}