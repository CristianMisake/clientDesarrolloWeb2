import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private route: ActivatedRoute) { }

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
      this.dataService.tokenSetter(resp.datos.token);
      this.router.navigate(['home'], { relativeTo: this.route });
      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));
    })
    // display form values on success
  }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  } 
}
