import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//servicio
import { DataService } from '../data.service';
//interfaces
import { interCategoria, interPlato, interResponse } from '../interfaces/interService';
declare var $: any;
declare var alertify: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  categorias: interCategoria[] = [];
  platos: interPlato[] = [];
  platosFilter: interPlato[] = [];
  platosSelect: interPlato[] = [];
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    //llenar tabla
    this.dataService.sendPostRequest('plato/list', {}).subscribe((resp: interResponse) => {
      this.platos = resp.datos;
      this.platosFilter = resp.datos;
      this.dataService.sendPostRequest('categoria/list', {}).subscribe((resp: interResponse) => {
        this.categorias = resp.datos;
        $(document).ready(() => {
          $('select').formSelect()
          $('#modalPedido').modal()
        })
      });
    });
    //llenar información
    this.form = this.formBuilder.group({
      idCategoria: ['', [Validators.required]],
    });
  }

  seleccionar(plato: interPlato) {
    plato.seleted = !plato.seleted;
    alertify.notify(`Se ha ${(plato.seleted) ? 'agregado' : 'quitado'} el plato "${plato.nombre}"`, 'success', 2);
  }

  EscogerPedido() {
    this.platosSelect = [...this.platos.filter(e => e.seleted)]
    $('#modalPedido').modal("open");
  }

  TotalPedidoSelect() {
    return this.platos.filter(e => e.seleted).length;
  }
  
  cancelar() {
    alertify.confirm('Aviso', '¿Desea cancelar este pedido?', () => {
      this.cerrarModal();
    }, () => alertify.notify('No se ha cancelado el pedido.', 'success', 2));
  }

  cerrarModal() {
    this.onReset();
    $('#modalPedido').modal("close");
  }

  pagar() {
    let platosIn = [];
    this.platosSelect.map(e => platosIn.push({ id:e.id, cantidad:e.cantidad }));
    if (platosIn.filter(e => !e.cantidad || e.cantidad <= 0).length > 0) return alertify.alert('Aviso', 'Coloque las cantidades de los pedidos mayores a 0.');
    this.dataService.sendPostRequest('pedido/create', { platos: platosIn }).subscribe(() => {
      this.cerrarModal();
      alertify.notify('Se ha guardado el pedido.', 'success', 2);
    });
  }

  onReset() {
    this.dataService.sendPostRequest('plato/list', {}).subscribe((resp: interResponse) => {
      this.platos = resp.datos;
      this.platosFilter = resp.datos;
    });
    this.platosSelect = []
    this.form.reset({
      idCategoria: '',
    });
    $('select').formSelect();
  }
}
