import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//servicio
import { DataService } from '../data.service';
//interfaces
import { interCategoria, interPlato, interResponse } from '../interfaces/interService';
declare var $: any;

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
    //validar session
    //this.dataService.verifySession();
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
    this.deleted = true;
    this.dataService.sendPostRequest('plato/delete', { id: plato.id }).subscribe((resp: interResponse)=>{
      if (resp.empty) return console.log(resp.mensaje);
      this.onReset();
      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));
    })
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
      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));
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
      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));
    })
    // display form values on success
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
