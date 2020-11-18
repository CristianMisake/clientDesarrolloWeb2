import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//servicio
import { DataService } from '../data.service';
//interfaces
import { interResponse } from '../interfaces/interService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    //validar session
    this.dataService.verifySession();
    //llenar información
    this.loginForm = this.formBuilder.group({
      user: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    //información
    this.dataService.sendPostRequest('usuario/login', this.loginForm.value).subscribe((resp: interResponse)=>{
      if (resp.empty) return console.log(resp.mensaje);
      this.dataService.openSession(resp.datos.token, resp.datos.is_admin);
    })
    // display form values on success
  }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  } 
}
