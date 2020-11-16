import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//servicio
import { DataService } from '../data.service';
//interfaces
import { interCliente, interResponse } from '../interfaces/interService';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clientes: interCliente[];
  clienteForm: FormGroup;
  clientSelect: number;
  submitted = false;
  deleted = false;
  edit = false;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    //validar session
    //this.dataService.verifySession();
    //llenar tabla
    this.clientes = [];
    this.dataService.sendPostRequest('usuario/list', {}).subscribe((resp: interResponse)=>this.clientes = resp.datos);
    //llenar información
    this.clienteForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      user: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onDelete(cliente:interCliente) {
    this.deleted = true;
    this.dataService.sendPostRequest('usuario/delete', { id: cliente.id }).subscribe((resp: interResponse)=>{
      if (resp.empty) return console.log(resp.mensaje);
      this.onReset();
      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));
    })
  }

  onEdit(cliente:interCliente) {
    this.edit = true;
    this.clienteForm.patchValue({
      name: cliente.name,
      user: cliente.user,
      password: '',
      confirmPassword: '',
    });
    this.clientSelect = cliente.id;
  }

  onUpdate() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.clienteForm.invalid) {
      return;
    }
    //información
    this.dataService.sendPostRequest('usuario/update', { ...this.clienteForm.value, id:this.clientSelect }).subscribe((resp: interResponse)=>{
      if (resp.empty) return console.log(resp.mensaje);
      this.onReset();
      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));
    })
  }

  onCancel() { this.onReset() }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.clienteForm.invalid) {
      return;
    }
    //información
    this.dataService.sendPostRequest('usuario/create', this.clienteForm.value).subscribe((resp: interResponse)=>{
      if (resp.empty) return console.log(resp.mensaje);
      this.onReset();
      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));
    })
    // display form values on success
  }

  onReset() {
    this.dataService.sendPostRequest('usuario/list', {}).subscribe((resp: interResponse)=>this.clientes = resp.datos);
    this.submitted = false;
    this.deleted = false;
    this.edit = false;
    this.clientSelect = 0;
    this.clienteForm.reset({
      name: '',
      user: '',
      password: '',
      confirmPassword: '',
    });
  }

}
