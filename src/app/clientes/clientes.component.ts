import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//servicio
import { DataService } from '../data.service';
//interfaces
import { interCliente, interResponse } from '../interfaces/interService';
declare var alertify: any;

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
    //llenar tabla
    this.clientes = [];
    this.dataService.sendPostRequest('usuario/list', {}).subscribe((resp: interResponse)=>this.clientes = resp.datos);
    //llenar información
    this.clienteForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      user: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onDelete(cliente:interCliente) {
    alertify.confirm('Aviso', '¿Desea eliminar este cliente?', () => {
      this.deleted = true;
      this.dataService.sendPostRequest('usuario/delete', { id: cliente.id }).subscribe((resp: interResponse)=>{
        if (resp.empty) return console.log(resp.mensaje);
        this.onReset();
        alertify.notify('Se ha eliminado la información.', 'error', 2);
      })
    }, () => alertify.notify('Se ha cancelado la eliminación.', 'success', 2));
  }

  onEdit(cliente:interCliente) {
    this.edit = true;
    this.clienteForm.patchValue({
      name: cliente.name,
      user: cliente.user,
      password: '',
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
      alertify.notify('Se ha actualizado la información.', 'success', 2);
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
      alertify.notify('Se ha guardado la información.', 'success', 2);
    })
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
    });
  }

}
