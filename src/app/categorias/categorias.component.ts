import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//servicio
import { DataService } from '../data.service';
//interfaces
import { interCategoria, interResponse } from '../interfaces/interService';

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
    //validar session
    //this.dataService.verifySession();
    //llenar tabla
    this.categorias = [];
    this.dataService.sendPostRequest('categoria/list', {}).subscribe((resp: interResponse)=>this.categorias = resp.datos);
    //llenar información
    this.categoriaForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onDelete(categoria:interCategoria) {
    this.deleted = true;
    this.dataService.sendPostRequest('categoria/delete', { id: categoria.id }).subscribe((resp: interResponse)=>{
      if (resp.empty) return console.log(resp.mensaje);
      this.onReset();
      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));
    })
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
      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));
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
      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));
    })
    // display form values on success
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
