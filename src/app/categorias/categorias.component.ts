import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//servicio
import { DataService } from '../data.service';
//interfaces
import { interCategoria, interResponse } from '../interfaces/interService';
declare var alertify: any;

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  categorias: interCategoria[];
  categoriaForm: FormGroup;
  categoriaSelect: number;
  submitted = false;
  deleted = false;
  edit = false;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    //llenar tabla
    this.categorias = [];
    this.dataService.sendPostRequest('categoria/list', {}).subscribe((resp: interResponse)=>this.categorias = resp.datos);
    //llenar información
    this.categoriaForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onDelete(categoria:interCategoria) {
    alertify.confirm('Aviso', '¿Desea eliminar esta categoría?', () => {
      this.deleted = true;
      this.dataService.sendPostRequest('categoria/delete', { id: categoria.id }).subscribe((resp: interResponse)=>{
        if (resp.empty) return console.log(resp.mensaje);
        this.onReset();
        alertify.notify('Se ha eliminado la información.', 'error', 2);
      })
    }, () => alertify.notify('Se ha cancelado la eliminación.', 'success', 2));
  }

  onEdit(categoria:interCategoria) {
    this.edit = true;
    this.categoriaForm.patchValue({
      nombre: categoria.nombre,
    });
    this.categoriaSelect = categoria.id;
  }

  onUpdate() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.categoriaForm.invalid) {
      return;
    }
    //información
    this.dataService.sendPostRequest('categoria/update', { ...this.categoriaForm.value, id:this.categoriaSelect }).subscribe((resp: interResponse)=>{
      if (resp.empty) return console.log(resp.mensaje);
      this.onReset();
      alertify.notify('Se ha actualizado la información.', 'success', 2);
    })
  }

  onCancel() { this.onReset() }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.categoriaForm.invalid) {
      return;
    }
    //información
    this.dataService.sendPostRequest('categoria/create', this.categoriaForm.value).subscribe((resp: interResponse)=>{
      if (resp.empty) return console.log(resp.mensaje);
      this.onReset();
      alertify.notify('Se ha guardado la información.', 'success', 2);
    })
  }

  onReset() {
    this.dataService.sendPostRequest('categoria/list', {}).subscribe((resp: interResponse)=>this.categorias = resp.datos);
    this.submitted = false;
    this.deleted = false;
    this.edit = false;
    this.categoriaSelect = 0;
    this.categoriaForm.reset({
      nombre: '',
    });
  }

}
