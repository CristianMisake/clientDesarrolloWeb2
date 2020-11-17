import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//servicio
import { DataService } from '../data.service';
//interfaces
import { interCategoria, interPlato, interResponse } from '../interfaces/interService';
declare var $: any;

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
  }

  EscogerPedido() {
    this.platosSelect = [...this.platos.filter(e => e.seleted)]
    $('#modalPedido').modal("open");
  }
  
  cancelar() {
    this.onReset();
    $('#modalPedido').modal("close");
  }

  pagar() {
    let platosIn = [];
    this.platosSelect.map(e => platosIn.push(e.id));
    this.dataService.sendPostRequest('pedido/create', { platos: platosIn }).subscribe((resp: interResponse) => {
      console.log(resp)
      this.cancelar();
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
