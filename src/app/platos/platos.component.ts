import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//servicio
import { DataService } from '../data.service';
//interfaces
import { interCategoria, interPlato, interResponse } from '../interfaces/interService';
declare var $: any;
declare var alertify: any;

@Component({
  selector: 'app-platos',
  templateUrl: './platos.component.html',
  styleUrls: ['./platos.component.scss']
})
export class PlatosComponent implements OnInit {
  platos: interPlato[];
  categorias: interCategoria[];
  platoForm: FormGroup;
  platoSelect: number;
  submitted = false;
  deleted = false;
  edit = false;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    //llenar tabla
    this.platos = [];
    this.categorias = [];
    this.dataService.sendPostRequest('plato/list', {}).subscribe((resp: interResponse) => {
      this.platos = resp.datos;
      this.dataService.sendPostRequest('categoria/list', {}).subscribe((resp: interResponse) => {
        this.categorias = resp.datos;
        $(document).ready(() => $('select').formSelect());
      });
    });
    //llenar información
    this.platoForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
      valor: ['', [Validators.required, Validators.minLength(3)]],
      idCategoria: ['', [Validators.required]],
    });
  }

  onDelete(plato:interPlato) {
    alertify.confirm('Aviso', '¿Desea eliminar este plato?', () => {
      this.deleted = true;
      this.dataService.sendPostRequest('plato/delete', { id: plato.id }).subscribe((resp: interResponse)=>{
        if (resp.empty) return console.log(resp.mensaje);
        this.onReset();
        alertify.notify('Se ha eliminado la información.', 'error', 2);
      })
    }, () => alertify.notify('Se ha cancelado la eliminación.', 'success', 2));
  }

  onEdit(plato:interPlato) {
    this.edit = true;
    this.platoForm.patchValue({
      nombre: plato.nombre,
      descripcion: plato.descripcion,
      valor: plato.valor,
      idCategoria: plato.idCategoria,
    });
    this.platoSelect = plato.id;
    $('select').formSelect();
  }

  onUpdate() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.platoForm.invalid) {
      return;
    }
    //información
    this.dataService.sendPostRequest('plato/update', { ...this.platoForm.value, id:this.platoSelect }).subscribe((resp: interResponse)=>{
      if (resp.empty) return console.log(resp.mensaje);
      this.onReset();
      alertify.notify('Se ha actualizado la información.', 'success', 2);
    })
  }

  onCancel() { this.onReset() }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.platoForm.invalid) return;
    //información
    this.dataService.sendPostRequest('plato/create', this.platoForm.value).subscribe((resp: interResponse)=>{
      if (resp.empty) return console.log(resp.mensaje);
      this.onReset();
      alertify.notify('Se ha guardado la información.', 'success', 2);
    })
  }

  onReset() {
    this.dataService.sendPostRequest('plato/list', {}).subscribe((resp: interResponse)=>this.platos = resp.datos);
    this.submitted = false;
    this.deleted = false;
    this.edit = false;
    this.platoSelect = 0;
    this.platoForm.reset({
      nombre: '',
      descripcion: '',
      valor: '',
      idCategoria: '',
    });
    $('select').formSelect();
  }

}
