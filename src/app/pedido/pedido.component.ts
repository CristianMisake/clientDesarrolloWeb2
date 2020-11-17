import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
//interfaces
import { interCategoria, interPlato } from '../interfaces/interService';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {
  @Input() platos: interPlato[];
  @Input() categorias: interCategoria[];
  @Output() cancelar = new EventEmitter();
  @Output() pagar = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  CancelarPedido(){
    this.cancelar.emit()
  }

  PagarPedido(){
    this.pagar.emit()
  }

}
